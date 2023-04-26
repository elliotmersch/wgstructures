let buildings = [];

async function getWG() {
    let updated = await fetch('cron_log.txt?rand='+Math.random());
    updated = await updated.text();
    let updateText = document.getElementById("updated");
    updateText.innerHTML = '';
    updateText.innerHTML = 'Updated: ' + updated + ' EST';
    console.log(updated);
    if(buildings.length < 1){
        let response = await fetch('wg_data.json?rand='+Math.random());
        buildings = await response.json();
        buildings.sort(function (a, b) {
            return a.building.fee - b.building.fee;
        });
    }

    let element = document.getElementById("mainData");
    element.innerHTML = '';

    //loop thru/display all buildings
    for (var x = 0; x < buildings.length; x++){
        //document.write(buildings[x].community);
        if(!buildings[x].building.closed){
            let row = createRow(x);
            element.innerHTML += row;
        }
    }
}

async function filterStrucs(strucType) {
    let element = document.getElementById("mainData");
    element.innerHTML = '';
    //loop thru array of buildings
    for (var x = 0; x < buildings.length; x++){
        switch(strucType){
            case 'BARN':
                if(!buildings[x].building.closed && buildings[x].building.type == 'BARN'){
                    let row = createRow(x);
                    element.innerHTML += row;
                }
                break;
            case 'BATHHOUSESHEEP':
                if(!buildings[x].building.closed && buildings[x].building.type == 'BATHHOUSE' && buildings[x].building.community != 101){
                    let row = createRow(x);
                    element.innerHTML += row;
                }
                break;
            case 'BATHHOUSEWOLF':
                if(!buildings[x].building.closed && buildings[x].building.type == 'BATHHOUSE' && buildings[x].building.community == 101){
                    let row = createRow(x);
                    element.innerHTML += row;
                }
                break;
            case 'DEN':
                if(!buildings[x].building.closed && buildings[x].building.type == 'DEN'){
                    let row = createRow(x);
                    element.innerHTML += row;
                }
                break;
        }
    }
}

function createRow(x) {
  let n;
  switch(buildings[x].building.rank){
    case 1:
      n = 'I';
      break;
    case 2:
      n = 'II';
      break;
    case 3:
      n = 'III';
      break;
  }
  let p;
  if(buildings[x].building.community == 101){
      p = buildings[x].building.fee + 2000;
      
  }else{
      p = buildings[x].building.fee + 1000;
  };
  let t = new Date(buildings[x].building.updatedAt);
  let monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
  let d = (monthNames[t.getMonth()]).substring(0, 3) + ' ' + t.getUTCDate();
  let r = '<div class="row"><div class="col community"><a href="https://game.wolf.game/community/' + buildings[x].building.community + '" target="_blank">' + buildings[x].building.community + '</a></div><div class="col landid">' + buildings[x].building.landId + '</div><div class="col type">' + (buildings[x].building.type).substring(0, 4) + ' ' + n + '</div><div class="col fee">' + p + '</div><div class="col rank">' + d + '</div></div>';
  return r;
}
