//Game 1(ccno): localStorage.getItem('extensions.turbowarp.org/local-storage:bd00529a636515a2')
//Game 2(mktval): localStorage.getItem('extensions.turbowarp.org/local-storage:5d274a6e40e409c7')
//Game 3(warehouse): localStorage.getItem('extensions.turbowarp.org/local-storage:a455fde571c68899')
//game 4(employees): localStorage.getItem('extensions.turbowarp.org/local-storage:1951b976f4f70bd6')
var key1 = 'extensions.turbowarp.org/local-storage:bd00529a636515a2';
var key2 = 'extensions.turbowarp.org/local-storage:5d274a6e40e409c7';
var key3 = 'extensions.turbowarp.org/local-storage:a455fde571c68899';
var key4 = 'extensions.turbowarp.org/local-storage:1951b976f4f70bd6';
var ccno = 0;
var cno = 500;
var bno = 0;
var mktval = 0;
var cap = 100;
var warehouseLevel = 1;
var warehouseCost = 100000;
var empno = 0;
var purchaseInProgress = false;
var lastUpdateTime = 0;
var boughtplaceholder = false;
var managerLevel = 0;
var combo = 0;
var buyingBags = false;
function pageloaded() {
    if (localStorage.getItem('cno') !== null) {
        cno = parseInt(localStorage.getItem('cno'))
    } else {
        cno = 100
        localStorage.setItem('cno', cno)
    }
    if (localStorage.getItem('bno') !== null) {
        bno = parseInt(localStorage.getItem('bno'))
    } else {
        bno = 0
        localStorage.setItem('bno', bno)
    }
    if (localStorage.getItem('warehouseLevel') !== null) {
        warehouseLevel = parseInt(localStorage.getItem('warehouseLevel'))
    } else {
        warehouseLevel = 1
        localStorage.setItem('warehouseLevel', warehouseLevel)
    }
    if (localStorage.getItem('warehouseCost') !== null) {
        warehouseCost = parseInt(localStorage.getItem('warehouseCost'))
    } else {
        warehouseCost = 100000
        localStorage.setItem('warehouseCost', warehouseCost)
    }
    if (localStorage.getItem('managerLevel') !== null) {
        managerLevel = parseInt(localStorage.getItem('managerLevel'))
    } else {
        managerLevel = 0
        localStorage.setItem('managerLevel', managerLevel)
    }
    // Initialize localStorage if not exist
    if (!localStorage.getItem(key1)) {
        localStorage.setItem(key1, JSON.stringify({ data: { policeval: 0, ccno: 0, bno: 0, cap: 100 } }));
    }
    if (!localStorage.getItem(key2)) {
        localStorage.setItem(key2, JSON.stringify({ data: { mktval: 0 } }));
    }
    if (!localStorage.getItem(key3)) {
        localStorage.setItem(key3, JSON.stringify({ data: { cap: 100, ccno: 0 } }));
    }
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '☀️';
    }
    updateCounts()
    document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
    document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
    document.getElementById('bno').innerHTML = `Bags: ${bno}`;
    document.getElementById('nextWarehouse').innerHTML = `Next Warehouse: Level ${warehouseLevel + 1}`;
    document.getElementById('newCapacity').innerHTML = `New capacity: ${cap * 2}`;
    document.getElementById('expandButton').innerHTML = `Expand Warehouse ($${formatNumber(warehouseCost, 2)})`;
    if (managerLevel == 1) {
        document.getElementById(`managerName1`).innerHTML = `Jeffery Epstein`;
        document.getElementById(`managerEffect1`).innerHTML = `2x Employee Profit`;
        document.getElementById(`hireManagerButton1`).innerHTML = `Hire Manager ($10M)`;
        document.getElementById(`managerName2`).style.display = `none`;
        document.getElementById(`managerEffect2`).style.display = `none`;
        document.getElementById(`hireManagerButton2`).style.display = `none`;
        document.getElementById(`managerHr2`).style.display = `none`;
    } else if (managerLevel == 2) {
        document.getElementById(`managerName1`).style.display = `none`;
        document.getElementById(`managerEffect1`).style.display = `none`;
        document.getElementById(`hireManagerButton1`).style.display = `none`;
        document.getElementById(`managerHr1`).style.display = `none`;
    }
}
function updateCounts() {
    if (localStorage.getItem(key1) && !buyingBags) {
        const obj = JSON.parse(localStorage.getItem(key1));
        if (obj.data.policeval == 1) {
            obj.data.policeval = 0
            obj.data.ccno = 0
            ccno = 0
            localStorage.setItem(key1, JSON.stringify(obj))
        }
        if (obj.data.bno !== bno && !buyingBags) {
            bno = obj.data.bno
            document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        }
        combo = obj.data.combo
        document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        ccno = obj.data.ccno
        document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
    } else if(buyingBags){
    }else{
        localStorage.setItem(key1, JSON.stringify({ data: { policeval: 0, ccno: 0, bno: 0, cap: 100 } }));
        bno = 0
        ccno = 0
        document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
    }
    if (localStorage.getItem(key4)) {
        const obj = JSON.parse(localStorage.getItem(key4))
        obj.data.cno = cno
        empno = obj.data.empno
        if (obj.data.time !== null && obj.data.time != lastUpdateTime) {
            lastUpdateTime = obj.data.time;
            cno = parseInt(cno) - parseInt(obj.data.bought);
            boughtplaceholder = 0;
        }
        if (boughtplaceholder == 0 && obj.data.bought > 0) {
            obj.data.bought = 0;
            boughtplaceholder = false;
        }
        localStorage.setItem(key4, JSON.stringify(obj))
        document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
        localStorage.setItem('cno', cno)
    } else {
        localStorage.setItem(key4, JSON.stringify({ data: { cno: cno, bought: 0 } }));
    }
    if (localStorage.getItem(key2)) {
        const obj = JSON.parse(localStorage.getItem(key2));
        obj.data.combo = combo
        mktval = obj.data.mktval
        localStorage.setItem(key2, JSON.stringify(obj));
        document.getElementById('mktval').innerHTML = `Child Value: ${formatNumber(mktval, 2)}`;
    } else {
        localStorage.setItem(key2, JSON.stringify({ data: { mktval: 0 } }));
        mktval = 0
        document.getElementById('mktval').innerHTML = `Child Value: ${formatNumber(mktval, 2)}`;
    }
    document.getElementById('totalmktval').innerHTML = `Total Current Value: $${formatNumber(ccno * mktval, 2)}`;
    if (localStorage.getItem(key3) !== null) {
        const obj = JSON.parse(localStorage.getItem(key3))
        cap = obj.data.cap
        obj.data.ccno = ccno
        localStorage.setItem(key3, JSON.stringify(obj))
    } else {
        cap = 100
    }
    document.getElementById('warecap').innerHTML = `Warehouse Capacity: ${ccno}/${cap}`;
    if(!buyingBags){
        const obj2 = JSON.parse(localStorage.getItem(key1))
        obj2.data.cap = cap
        localStorage.setItem(key1, JSON.stringify(obj2))
    }
}
function workerSlave() {
    if(!buyingBags){
        if (managerLevel > 0) {
            if (parseInt(ccno) + (parseInt(empno) * (2 * parseInt(managerLevel))) <= cap && empno > 0 || ccno == 0) {
                const obj = JSON.parse(localStorage.getItem(key1));
                obj.data.ccno = parseInt(obj.data.ccno) + (parseInt(empno) * (2 * parseInt(managerLevel)));
                ccno = parseInt(obj.data.ccno)
                localStorage.setItem(key1, JSON.stringify(obj));
                document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
            } else if (empno > 0) {
                const obj = JSON.parse(localStorage.getItem(key1));
                obj.data.ccno = cap;
                ccno = parseInt(obj.data.ccno)
                localStorage.setItem(key1, JSON.stringify(obj));
                document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
            }
        } else {
            if (ccno + empno <= cap && empno > 0 || ccno == 0) {
                const obj = JSON.parse(localStorage.getItem(key1));
                obj.data.ccno = parseInt(obj.data.ccno) + parseInt(empno);
                ccno = parseInt(obj.data.ccno)
                localStorage.setItem(key1, JSON.stringify(obj));
                document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;

            } else if (empno > 0 || cap < ccno) {
                const obj = JSON.parse(localStorage.getItem(key1));
                obj.data.ccno = cap;
                ccno = parseInt(obj.data.ccno)
                localStorage.setItem(key1, JSON.stringify(obj));
                document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
            }
        }
    }
}
function sellChildren() {
    buyingBags = true;
    setTimeout(function () {
    cno = parseInt(cno) + (parseInt(ccno) * parseInt(mktval));
    ccno = 0;
    const obj = JSON.parse(localStorage.getItem(key1));
    obj.data.ccno = 0
    localStorage.setItem(key1, JSON.stringify(obj))
    document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
    document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
    localStorage.setItem('cno', cno)
    reportSale(tempccno);
    }, 100)
    buyingBags = false;
}
function buyBags() {
    buyingBags = true;
    oldBno = bno;
    console.debug(`Attempting to buy bags. Bag amount: ${document.getElementById('bagAmt').value}, Total cost: $${formatNumber((parseInt(document.getElementById('bagAmt').value) * 10), 2)}, Current cash: $${formatNumber(cno, 2)}`)
    if (parseInt(document.getElementById('bagAmt').value) * 10 <= cno) {
        const obj = JSON.parse(localStorage.getItem(key1))
        const bagAmount = parseInt(document.getElementById('bagAmt').value);
        bno = bno + parseInt(document.getElementById('bagAmt').value);
        cno = cno - (parseInt(document.getElementById('bagAmt').value) * 10);
        localStorage.setItem('cno', cno);
        localStorage.setItem('bno', bno);
        console.debug(`Bags purchased successfully. New bag count: ${bno}, New cash amount: $${formatNumber(cno, 2)}`)
        obj.data.bno = parseInt(bno)
        localStorage.setItem(key1, JSON.stringify(obj));
        const objv2 = JSON.parse(localStorage.getItem(key1))
        if (objv2.data.bno !== bno) {
            while (objv2.data.bno !== bno) {
            objv2.data.bno = bno
            localStorage.setItem(key1, JSON.stringify(objv2))
            }
        }else{
                console.debug(`Bag count in localStorage updated successfully. Bag amount: ${bagAmount}, Current bags: ${bno}`)
        }
        console.debug(`Starting check purchase interval to make sure bags were added. Bag amount: ${bagAmount}, Old bags: ${oldBno}, Current bags: ${bno}`)
        document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
        console.debug(`Bags were added successfully. Bag amount: ${bagAmount}, Current bags: ${bno}, Old bags: ${oldBno}`)
    } else {
        console.debug(`Not enough cash to buy bags. Attempted to buy ${document.getElementById('bagAmt').value} bags for $${formatNumber((parseInt(document.getElementById('bagAmt').value) * 10), 2)}, but only have $${formatNumber(cno, 2)}`)
        return;
    }
    setTimeout(function () {
        if (bno != oldBno + parseInt(document.getElementById('bagAmt').value)) {
            console.debug(`Failed to update bags. Expected ${oldBno + parseInt(document.getElementById('bagAmt').value)}, got ${bno}`);
            buyingBags = false;
        }else{
            console.debug(`Bags updated successfully. Expected ${oldBno + parseInt(document.getElementById('bagAmt').value)}, got ${bno}`);
            buyingBags = false;
        }
    }, 1000)
}
function hireManager(id) {
    if (id == 1 && managerLevel == 0 && cno >= 5000000) {
        managerLevel = 1;
        cno -= 5000000;
        document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
        document.getElementById(`managerName1`).innerHTML = `Jeffery Epstein`;
        document.getElementById(`managerEffect1`).innerHTML = `2x Employee Profit`;
        document.getElementById(`hireManagerButton1`).innerHTML = `Hire Manager ($10M)`;
        document.getElementById(`managerName2`).style.display = `none`;
        document.getElementById(`managerEffect2`).style.display = `none`;
        document.getElementById(`hireManagerButton2`).style.display = `none`;
        document.getElementById(`managerHr2`).style.display = `none`;
    } else if (id == 2 && cno >= 10000000) {
        managerLevel = 2;
        cno -= 10000000;
        document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
        document.getElementById(`managerName1`).style.display = `none`;
        document.getElementById(`managerEffect1`).style.display = `none`;
        document.getElementById(`hireManagerButton1`).style.display = `none`;
        document.getElementById(`managerHr1`).style.display = `none`;
    }
}
function updateBagTotal() {
    console.debug(`Updating bag total. Bag amount: ${document.getElementById('bagAmt').value}, Total: $${formatNumber((parseInt(document.getElementById('bagAmt').value) * 10), 2)}`)
    document.getElementById('bagTotal').innerHTML = `Total: $${formatNumber((parseInt(document.getElementById('bagAmt').value) * 10), 2)}`
}
function reportSale(amount) {
    const obj = JSON.parse(localStorage.getItem(key2));
    obj.data.ccno = amount
    localStorage.setItem(key2, JSON.stringify(obj))
}
function expandWarehouse() {
    if (cno >= warehouseCost) {
        cno -= warehouseCost;
        warehouseLevel++;
        warehouseCost *= 2;
        cap *= 2;
        localStorage.setItem('cno', cno);
        localStorage.setItem('warehouseLevel', warehouseLevel);
        localStorage.setItem('warehouseCost', warehouseCost);
        // Update cap in localStorage
        const obj3 = JSON.parse(localStorage.getItem(key3));
        obj3.data.cap = cap;
        localStorage.setItem(key3, JSON.stringify(obj3));
        const obj1 = JSON.parse(localStorage.getItem(key1));
        obj1.data.cap = cap;
        localStorage.setItem(key1, JSON.stringify(obj1));
        // Update UI
        document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
        document.getElementById('warecap').innerHTML = `Warehouse Capacity: ${ccno}/${cap}`;
        document.getElementById('nextWarehouse').innerHTML = `Next Warehouse: Level ${warehouseLevel + 1}`;
        document.getElementById('newCapacity').innerHTML = `New capacity: ${cap * 2}`;
        document.getElementById('expandButton').innerHTML = `Expand Warehouse ($${formatNumber(warehouseCost, 2)})`;
    }
}
setInterval(function () {
    updateCounts()
}, 99)
setInterval(function () {
    workerSlave()
}, 1000)
// Dark mode toggle function
function toggleDarkMode() {
    const body = document.body;
    const toggleButton = document.getElementById('darkModeToggle');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'true');
        toggleButton.innerHTML = '☀️';
    } else {
        localStorage.setItem('darkMode', 'false');
        toggleButton.innerHTML = '🌙';
    }
}
const formatNumber = (num, decimals = 2) => {
    if (num == null) return 'Invalid input';

    // Convert input to a number, removing non-numeric characters if it's a string
    let numValue = typeof num === 'string' ? parseFloat(num.replace(/[^0-9.-]/g, '')) : Number(num);

    if (isNaN(numValue)) return 'Invalid input';

    // Determine if the number is negative and get its absolute value
    const isNegative = numValue < 0;
    const absValue = Math.abs(numValue);

    // If the absolute value is below 1000, return it as is
    if (absValue < 1000) return isNegative ? `-${absValue}` : absValue;

    // Define suffixes for large numbers
    const suffixes = [
        { value: 1e18, symbol: 'E' },
        { value: 1e15, symbol: 'P' },
        { value: 1e12, symbol: 'T' },
        { value: 1e9, symbol: 'B' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'K' }
    ];

    // Find the largest suffix that fits the number
    const suffix = suffixes.find(({ value }) => absValue >= value);
    if (!suffix) return numValue.toString();

    // Format the number by dividing by the suffix value and fixing decimals
    let formattedValue = (absValue / suffix.value).toFixed(decimals);

    // Remove trailing zeros and unnecessary decimal points
    formattedValue = formattedValue.replace(/\.?0+$/, '');

    // Add back the negative sign if needed and append the suffix
    return (isNegative ? '-' : '') + formattedValue + suffix.symbol;
};
function resetGame() {
    if (!confirm("Are you sure you want to reset the game? This will erase all progress.")) return;

    // Pause all iframes completely
    const iframes = document.querySelectorAll('iframe');
    const iframeSources = [];
    iframes.forEach((iframe, index) => {
        iframeSources[index] = iframe.src; // save original src
        iframe.src = 'about:blank';        // disable iframe
    });

    // Small delay to ensure iframes are completely off
    setTimeout(() => {
        // Reset all game variables
        ccno = 0;
        cno = 100;
        bno = 0;
        mktval = 0;
        cap = 100;
        warehouseLevel = 1;
        warehouseCost = 100000;
        empno = 0;
        purchaseInProgress = false;
        lastUpdateTime = 0;
        boughtplaceholder = false;

        // Reset localStorage entries
        localStorage.setItem(key1, JSON.stringify({ data: { policeval: 0, ccno: 0, bno: 0, cap: 100 } }));
        localStorage.setItem(key2, JSON.stringify({ data: { mktval: 0 } }));
        localStorage.setItem(key3, JSON.stringify({ data: { cap: 100, ccno: 0 } }));
        localStorage.setItem(key4, JSON.stringify({ data: { cno: cno, bought: 0, empno: 0, time: 0 } }));
        localStorage.setItem('cno', cno);
        localStorage.setItem('bno', bno);
        localStorage.setItem('warehouseLevel', warehouseLevel);
        localStorage.setItem('warehouseCost', warehouseCost);

        // Update UI
        document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
        document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
        document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        document.getElementById('nextWarehouse').innerHTML = `Next Warehouse: Level ${warehouseLevel + 1}`;
        document.getElementById('newCapacity').innerHTML = `New capacity: ${cap * 2}`;
        document.getElementById('expandButton').innerHTML = `Expand Warehouse ($${formatNumber(warehouseCost, 2)})`;
        document.getElementById('warecap').innerHTML = `Warehouse Capacity: ${ccno}/${cap}`;
        document.getElementById('mktval').innerHTML = `Child Value: ${formatNumber(mktval, 2)}`;
        document.getElementById('totalmktval').innerHTML = `Total Current Value: $${formatNumber(ccno * mktval, 2)}`;

        // Reload iframes after reset
        iframes.forEach((iframe, index) => {
            iframe.src = iframeSources[index];
        });

        console.warn("Game has been reset and iframes reloaded.");
    }, 50); // 50ms delay ensures iframes are fully unloaded
}
// ── Menu Modal ───────────────────────────────────────────
function openMenu() {
    const overlay = document.getElementById('menuOverlay');
    if (overlay) {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }
}
function closeMenu(event) {
    // If called from overlay click, only close when clicking the backdrop itself
    if (event && event.target !== document.getElementById('menuOverlay')) return;
    const overlay = document.getElementById('menuOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Attach event listener to the toggle button
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }

    // Wire menu button
    const menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', openMenu);
    }

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // Make iframe scrolling affect the entire page
    document.addEventListener('scroll', (e) => {
        if (e.target.tagName === 'IFRAME') {
            e.preventDefault();
            window.scrollBy(0, e.deltaY);
        }
    }, { passive: false });
});
