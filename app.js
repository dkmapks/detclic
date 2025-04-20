document.addEventListener("DOMContentLoaded", () => {
    const companies = generateCompanies(10);
    const betsContainer = document.getElementById("bets");
    const outcomeElement = document.getElementById("outcome");
    const userFundsElement = document.getElementById("user-funds");
    const betHistoryElement = document.getElementById("bet-history");

    let userFunds = 500; // Początkowe środki użytkownika
    const betHistory = []; // Historia zakładów

    // Aktualizacja salda użytkownika
    function updateFundsDisplay() {
        userFundsElement.textContent = `Saldo: ${userFunds.toFixed(2)}$`;
    }

    // Inicjalizacja wydarzeń
    companies.forEach(company => {
        const div = document.createElement("div");
        div.className = "company";
        div.innerHTML = `
            <p>${company.name} (Kurs: ${company.odds})</p>
            <label>
                Stawka:
                <input type="number" id="stake-${company.name}" placeholder="Wprowadź stawkę" min="1" max="${userFunds}">
            </label>
            <button onclick="placeBet('${company.name}', ${company.odds})">Obstaw</button>
        `;
        betsContainer.appendChild(div);
    });

    // Funkcja generowania firm
    function generateCompanies(count) {
        const names = Array.from({ length: count }, (_, i) => `Zespół ${i + 1}`);
        return names.map(name => ({
            name,
            odds: (Math.random() * 5 + 1).toFixed(2) // Kursy od 1.00 do 6.00
        }));
    }

    // Funkcja obstawiania
    window.placeBet = (companyName, odds) => {
        const stakeInput = document.getElementById(`stake-${companyName}`);
        const stake = parseFloat(stakeInput.value);

        if (!stake || stake <= 0 || stake > userFunds) {
            alert("Nieprawidłowa stawka!");
            return;
        }

        const result = Math.random() < 0.5 ? "wygrałeś" : "przegrałeś";
        const winAmount = result === "wygrałeś" ? stake * odds : 0;
        userFunds += winAmount - stake;

        // Aktualizacja historii zakładów
        betHistory.push({
            companyName,
            odds,
            stake,
            result,
            winAmount
        });
        updateBetHistory();

        // Wyświetlenie wyniku
        outcomeElement.textContent = `Twój zakład na "${companyName}" ${result}! 
            Kurs: ${odds}, Wygrałeś: ${winAmount.toFixed(2)}$`;

        // Aktualizacja salda
        updateFundsDisplay();
    };

    // Funkcja aktualizacji historii zakładów
    function updateBetHistory() {
        betHistoryElement.innerHTML = "";
        betHistory.forEach(bet => {
            const div = document.createElement("div");
            div.className = "bet-entry";
            div.innerHTML = `
                <p>${bet.companyName} | Kurs: ${bet.odds} | Stawka: ${bet.stake}$ | Wynik: ${bet.result} | Wygrana: ${bet.winAmount.toFixed(2)}$</p>
            `;
            betHistoryElement.appendChild(div);
        });
    }

    // Inicjalizacja UI
    updateFundsDisplay();
});