//Game 1(ccno): localStorage.getItem('extensions.turbowarp.org/local-storage:bd00529a636515a2')
//Game 2(mktval): localStorage.getItem('extensions.turbowarp.org/local-storage:5d274a6e40e409c7')
//Game 3:
var ccno = 0;
var cno = 0;
var bno = 0;
var mktval = 0;
var cap = 100;
function pageloaded(){
    if(localStorage.getItem('cno')){
        cno = localStorage.getItem('cno')
    }else{
        cno = 0
        localStorage.setItem('cno', cno)
    }
    if(localStorage.getItem('bno')){
        bno = localStorage.getItem('bno')
    }else{
        bno = 0
        localStorage.setItem('bno', bno)
    }
    updateCounts()
    document.getElementById('ccno').innerHTML = `Children Collected: ${ccno}`;
    document.getElementById('cno').innerHTML = `Cash: $${cno}`;
    document.getElementById('bno').innerHTML = `Bags: ${bno}`;
}
function updateCounts(){
    if(localStorage.getItem('extensions.turbowarp.org/local-storage:bd00529a636515a2')){
        const obj = JSON.parse(localStorage.getItem('extensions.turbowarp.org/local-storage:bd00529a636515a2'));
        if(obj.data.policeval == 1){
            obj.data.policeval = 0
            obj.data.ccno = 0
            ccno = 0
            localStorage.setItem('extensions.turbowarp.org/local-storage:bd00529a636515a2', JSON.stringify(obj))
        }
        bno = obj.data.bno
        document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        ccno = obj.data.ccno
        document.getElementById('ccno').innerHTML = `Children Collected: ${ccno}`;
    }
    if(localStorage.getItem('extensions.turbowarp.org/local-storage:5d274a6e40e409c7')){
        const obj = JSON.parse(localStorage.getItem('extensions.turbowarp.org/local-storage:5d274a6e40e409c7'));
        mktval = obj.data.mktval
        document.getElementById('mktval').innerHTML = `Child Value: ${mktval}`;
    }
    document.getElementById('totalmktval').innerHTML = `Total Current Value: $${ccno * mktval}`;
    const obj = JSON.parse(localStorage.getItem('extensions.turbowarp.org/local-storage:a455fde571c68899'))
    cap = obj.data.cap
    obj.data.ccno = ccno
    localStorage.setItem('extensions.turbowarp.org/local-storage:a455fde571c68899', JSON.stringify(obj))
    document.getElementById('warecap').innerHTML = `Warehouse Capacity: ${ccno}/${cap}`;
    const obj2 = JSON.parse(localStorage.getItem('extensions.turbowarp.org/local-storage:bd00529a636515a2'))
    obj2.data.cap = cap
    localStorage.setItem('extensions.turbowarp.org/local-storage:bd00529a636515a2', JSON.stringify(obj2))
}
function sellChildren(){
    tempccno = ccno;
    ccno = 0;
    const obj = JSON.parse(localStorage.getItem('extensions.turbowarp.org/local-storage:bd00529a636515a2'));
    obj.data.ccno = 0
    localStorage.setItem('extensions.turbowarp.org/local-storage:bd00529a636515a2', JSON.stringify(obj))
    document.getElementById('ccno').innerHTML = `Children Collected: ${ccno}`;
    cno = parseInt(cno) + (parseInt(tempccno) * parseInt(mktval));
    document.getElementById('cno').innerHTML = `Cash: $${cno}`;
    localStorage.setItem('cno', cno)
}
function buyBags(){
    if(parseInt(document.getElementById('bagAmt').value) * 10 <= cno){
        bno = bno + parseInt(document.getElementById('bagAmt').value);
        cno = cno - (parseInt(document.getElementById('bagAmt').value) * 10);
        document.getElementById('bno').innerHTML = `Bags: ${bno}`;
        document.getElementById('cno').innerHTML = `Cash: $${cno}`;
        const obj = JSON.parse(localStorage.getItem('extensions.turbowarp.org/local-storage:bd00529a636515a2'))
        obj.data.bno = parseInt(bno)
        localStorage.setItem('extensions.turbowarp.org/local-storage:bd00529a636515a2', JSON.stringify(obj));
    }
}
function updateBagTotal(){
    document.getElementById('bagTotal').innerHTML = `Total: $${parseInt(document.getElementById('bagAmt').value) * 10}`
}
setInterval(function(){
    updateCounts()
}, 100)
