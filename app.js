document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener to the button
    document.getElementById('reveal-button').addEventListener('click', function() {
        // Change the content of the paragraph when the button is clicked
        document.getElementById('dynamic-content').innerText = 'You found the secret message! 👏';
    });
});
