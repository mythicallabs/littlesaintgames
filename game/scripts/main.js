//Game 1(ccno): localStorage.getItem('extensions.turbowarp.org/local-storage:bd00529a636515a2')
//Game 2(mktval): localStorage.getItem('extensions.turbowarp.org/local-storage:5d274a6e40e409c7')
//Game 3:
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
function pageloaded(){
    if(localStorage.getItem('cno') !== null){
        cno = parseInt(localStorage.getItem('cno'))
    }else{
        cno = 100
        localStorage.setItem('cno', cno)
    }
    if(localStorage.getItem('bno') !== null){
        bno = parseInt(localStorage.getItem('bno'))
    }else{
        bno = 0
        localStorage.setItem('bno', bno)
    }
    if(localStorage.getItem('warehouseLevel') !== null){
        warehouseLevel = parseInt(localStorage.getItem('warehouseLevel'))
    }else{
        warehouseLevel = 1
        localStorage.setItem('warehouseLevel', warehouseLevel)
    }
    if(localStorage.getItem('warehouseCost') !== null){
        warehouseCost = parseInt(localStorage.getItem('warehouseCost'))
    }else{
        warehouseCost = 100000
        localStorage.setItem('warehouseCost', warehouseCost)
    }
    // Initialize localStorage if not exist
    if (!localStorage.getItem(key1)) {
        localStorage.setItem(key1, JSON.stringify({data: {policeval: 0, ccno: 0, bno: 0, cap: 100}}));
    }
    if (!localStorage.getItem(key2)) {
        localStorage.setItem(key2, JSON.stringify({data: {mktval: 0}}));
    }
    if (!localStorage.getItem(key3)) {
        localStorage.setItem(key3, JSON.stringify({data: {cap: 100, ccno: 0}}));
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
}
function updateCounts(){
    if(localStorage.getItem(key4)){
        const obj = JSON.parse(localStorage.getItem(key4))
        obj.data.cno = cno
        empno = obj.data.empno
        if(obj.data.time !== null && obj.data.time != lastUpdateTime){
            lastUpdateTime = obj.data.time;
            cno = parseInt(cno) - parseInt(obj.data.bought);
            boughtplaceholder = 0;
        }
        if(boughtplaceholder == 0 && obj.data.bought > 0){
            obj.data.bought = 0;
            boughtplaceholder = false;
        }
        localStorage.setItem(key4, JSON.stringify(obj))
        console.log(`${localStorage.getItem(key4)}`)
        document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
        localStorage.setItem('cno', cno)
    }else{
        localStorage.setItem(key4, JSON.stringify({data: {cno: cno, bought: 0}}));
    }
    if(localStorage.getItem(key1)){
        const obj = JSON.parse(localStorage.getItem(key1));
        if(obj.data.policeval == 1){
            obj.data.policeval = 0
            obj.data.ccno = 0
            ccno = 0
            localStorage.setItem(key1, JSON.stringify(obj))
        }
        bno = obj.data.bno
        document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        ccno = obj.data.ccno
        document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
    }else{
        localStorage.setItem(key1, JSON.stringify({data: {policeval: 0, ccno: 0, bno: 0, cap: 100}}));
        bno = 0
        ccno = 0
        document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
    }
    if(localStorage.getItem(key2)){
        const obj = JSON.parse(localStorage.getItem(key2));
        mktval = obj.data.mktval
        document.getElementById('mktval').innerHTML = `Child Value: ${formatNumber(mktval, 2)}`;
    }else{
        localStorage.setItem(key2, JSON.stringify({data: {mktval: 0}}));
        mktval = 0
        document.getElementById('mktval').innerHTML = `Child Value: ${formatNumber(mktval, 2)}`;
    }
    document.getElementById('totalmktval').innerHTML = `Total Current Value: $${formatNumber(ccno * mktval, 2)}`;
    if(localStorage.getItem(key3)){
        const obj = JSON.parse(localStorage.getItem(key3))
        cap = obj.data.cap
        obj.data.ccno = ccno
        localStorage.setItem(key3, JSON.stringify(obj))
    }else{
        localStorage.setItem(key3, JSON.stringify({data: {cap: 100, ccno: ccno}}));
        cap = 100
    }
    document.getElementById('warecap').innerHTML = `Warehouse Capacity: ${ccno}/${cap}`;
    const obj2 = JSON.parse(localStorage.getItem(key1))
    obj2.data.cap = cap
    localStorage.setItem(key1, JSON.stringify(obj2))
}
function workerSlave(){
    if(ccno + empno <= cap && empno > 0){
        const obj = JSON.parse(localStorage.getItem(key1));
        obj.data.ccno = parseInt(obj.data.ccno) + parseInt(empno);
        ccno = parseInt(obj.data.ccno)
        localStorage.setItem(key1, JSON.stringify(obj));
        document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
    }
}
function sellChildren(){
    tempccno = ccno;
    ccno = 0;
    const obj = JSON.parse(localStorage.getItem(key1));
    obj.data.ccno = 0
    localStorage.setItem(key1, JSON.stringify(obj))
    document.getElementById('ccno').innerHTML = `Children Collected: ${formatNumber(ccno, 2)}`;
    cno = parseInt(cno) + (parseInt(tempccno) * parseInt(mktval));
    document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
    localStorage.setItem('cno', cno)
}
function buyBags(){
    if(parseInt(document.getElementById('bagAmt').value) * 10 <= cno){
        bno = bno + parseInt(document.getElementById('bagAmt').value);
        cno = cno - (parseInt(document.getElementById('bagAmt').value) * 10);
        document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        document.getElementById('cno').innerHTML = `Cash: $${formatNumber(cno, 2)}`;
        const obj = JSON.parse(localStorage.getItem(key1))
        obj.data.bno = parseInt(bno)
        localStorage.setItem(key1, JSON.stringify(obj));
        localStorage.setItem('cno', cno);
    }
}
function updateBagTotal(){
    document.getElementById('bagTotal').innerHTML = `Total: $${formatNumber(parseInt(document.getElementById('bagAmt').value) * 10, 2)}`
}
function expandWarehouse(){
    if(cno >= warehouseCost){
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
setInterval(function(){
    updateCounts()
}, 10)
setInterval(function(){
    workerSlave()
}, 2000)
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
        localStorage.setItem(key1, JSON.stringify({data: {policeval: 0, ccno: 0, bno: 0, cap: 100}}));
        localStorage.setItem(key2, JSON.stringify({data: {mktval: 0}}));
        localStorage.setItem(key3, JSON.stringify({data: {cap: 100, ccno: 0}}));
        localStorage.setItem(key4, JSON.stringify({data: {cno: cno, bought: 0, empno: 0, time: 0}}));
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

        console.log("Game has been reset and iframes reloaded.");
    }, 50); // 50ms delay ensures iframes are fully unloaded
}
// Attach event listener to the toggle button
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }

    // Make iframe scrolling affect the entire page
    document.addEventListener('scroll', (e) => {
        if (e.target.tagName === 'IFRAME') {
            e.preventDefault();
            window.scrollBy(0, e.deltaY);
        }
    }, { passive: false });
});
