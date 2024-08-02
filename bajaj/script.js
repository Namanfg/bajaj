document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inputForm');
    const jsonInput = document.getElementById('jsonInput');
    const errorMessage = document.getElementById('errorMessage');
    const responseContainer = document.getElementById('responseContainer');
    const responseContent = document.getElementById('responseContent');
    const alphabetsCheckbox = document.getElementById('alphabetsCheckbox');
    const numbersCheckbox = document.getElementById('numbersCheckbox');
    const highestAlphabetCheckbox = document.getElementById('highestAlphabetCheckbox');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        errorMessage.textContent = '';
        responseContainer.style.display = 'none';

        try {
            const inputData = JSON.parse(jsonInput.value);
            const response = await fetch('https://your-backend-url.herokuapp.com/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            displayResponse(data);
        } catch (error) {
            errorMessage.textContent = 'Invalid JSON or API error';
        }
    });

    function displayResponse(data) {
        responseContainer.style.display = 'block';
        updateResponseContent();

        [alphabetsCheckbox, numbersCheckbox, highestAlphabetCheckbox].forEach(checkbox => {
            checkbox.addEventListener('change', updateResponseContent);
        });

        function updateResponseContent() {
            let content = '';

            if (alphabetsCheckbox.checked && data.alphabets.length > 0) {
                content += `<h3>Alphabets:</h3><p>${data.alphabets.join(', ')}</p>`;
            }

            if (numbersCheckbox.checked && data.numbers.length > 0) {
                content += `<h3>Numbers:</h3><p>${data.numbers.join(', ')}</p>`;
            }

            if (highestAlphabetCheckbox.checked && data.highest_alphabet.length > 0) {
                content += `<h3>Highest alphabet:</h3><p>${data.highest_alphabet.join(', ')}</p>`;
            }

            responseContent.innerHTML = content;
        }
    }
});