document.getElementById("registerForm").addEventListener("submit", function(e){

    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if(password !== confirm){
        alert("Passwords do not match.");
        return;
    }

    alert("Registration successful! Database integration will be added later.");

    this.reset();

}); 