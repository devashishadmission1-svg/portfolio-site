import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase credentials
const supabaseUrl = "https://imxtctlfaeyceaoficoh.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlteHRjdGxmYWV5Y2Vhb2ZpY29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMDcyOTEsImV4cCI6MjA4MTU4MzI5MX0.fDOlYphmVUYQLUv7NcW6j4zLuKl7D5CeEKQq5fqp640";

const supabase = createClient(supabaseUrl, supabaseKey);

// SIGN UP
window.signup = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        alert(error.message);
    } else {
        alert("Signup successful! Check your email.");
    }
};

// LOGIN
// LOGIN
window.login = async () => {
    const password = document.getElementById("password").value;

    if (password === "tylerisreal") {
        sessionStorage.setItem('isAdmin', 'true');
        window.location.href = "dashboard.html";
    } else {
        alert("Access Denied");
    }
};

// LOGOUT
// LOGOUT
window.logout = async () => {
    sessionStorage.removeItem('isAdmin');
    window.location.href = "index.html";
};

// PROTECT DASHBOARD PAGE
// PROTECT DASHBOARD PAGE
// Handled directly in dashboard.html via sessionStorage check

