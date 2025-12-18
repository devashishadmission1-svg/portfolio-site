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
const ADMIN_EMAIL = "admin@portfolio.com"; // IMPORTANT: Create a user in Supabase with this email!

window.login = async () => {
    const password = document.getElementById("password").value;

    // Using hardcoded email so UI only needs password
    const { error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password,
    });

    if (error) {
        alert(error.message);
    } else {
        window.location.href = "dashboard.html";
    }
};

// LOGOUT
window.logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
};

// PROTECT DASHBOARD PAGE
supabase.auth.onAuthStateChange((event, session) => {
    if (!session && window.location.pathname.includes("dashboard")) {
        window.location.href = "index.html";
    }
});
