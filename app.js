document.addEventListener("DOMContentLoaded", () => {
    const companies = generateCompanies(20);
    const betsContainer = document.getElementById("bets");
    const outcomeElement = document.getElementById("outcome");
    const modControls = document.getElementById("mod-controls");

    let userFunds = 500; // Początkowe środki użytkownika
    let loans = 0; // Kwota pożyczek

    // Inicjalizacja wydarzeń
    companies.forEach(company => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${company.name} (Kurs: ${company.odds})</p>
            <button onclick="placeBet('${company.name}', ${company.odds})">Obstaw</button>
        `;
        betsContainer.appendChild(div);
    });

    // Funkcja generowania firm
    function generateCompanies(count) {
        const names = Array.from({ length: count }, (_, i) => `Firma ${i + 1}`);
        return names.map(name => ({
            name,
            odds: (Math.random() * 5 + 1).toFixed(2) // Kursy od 1.00 do 6.00
        }));
    }

    // Funkcja obstawiania
    window.placeBet = (companyName, odds) => {
        const result = Math.random() < 0.5 ? "wygrałeś!" : "przegrałeś.";
        outcomeElement.textContent = `Twój zakład na "${companyName}" ${result} Kurs: ${odds}`;
    };

    // Obsługa Mod Menu
    window.addFunds = () => {
        userFunds += 1000;
        alert(`Dodano 1000$! Masz teraz ${userFunds}$`);
    };

    window.setOdds = () => {
        const newOdds = prompt("Podaj nowy kurs:");
        if (newOdds) alert(`Nowy kurs ustawiony: ${newOdds}`);
    };

    window.forceWin = () => {
        const winner = prompt("Podaj nazwę firmy, która ma wygrać:");
        alert(`Ustawiono wygraną dla: ${winner}`);
    };

    window.manageLoans = () => {
        if (loans > 10000) {
            alert("Osiągnięto limit pożyczek!");
            return;
        }
        loans += 1000;
        alert(`Pożyczono 1000$. Musisz oddać ${loans * 3}$!`);
    };

    // Kod dostępu do Mod Menu
    document.querySelector("#mod-menu h2").addEventListener("click", () => {
        const code = prompt("Podaj kod dostępu:");
        if (code === "7442") {
            modControls.style.display = "block";
            alert("Mod Menu odblokowane!");
        } else {
            alert("Nieprawidłowy kod!");
        }
    });
});
