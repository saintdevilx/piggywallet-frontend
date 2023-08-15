import { ToastController, AlertController } from '@ionic/angular';

export function getDateDiffrence(date1, diffType='day'){
    let today = new Date();
    let months = (date1.getMonth() - new Date().getMonth());
    let total_days = months*30 + (date1.getDay() - today.getDay());
    let weeks = Math.floor(total_days/7);
    let remaining_days = diffType === 'day' ? total_days : (diffType==='month'? (date1.getDay() - today.getDay()): (total_days - weeks * 7)  );

    let response = {"day":remaining_days};
    if(diffType === "week") return response["week"] = weeks;
    else if(diffType === "month") response["month"] =  months;

    return response;    
}

export function compareDate(date1, date2){
   if(date1.getYear() === date1.getYear() &&
   date1.getDate() === date2.getDate() && 
   date1.getMonth() === date2.getMonth() ) return true;
   return false;
}

export function getGroupByTransaction(transactions, keymethod){
  let groupedTrans:Object={};
  transactions.forEach(element => {
    let dt = keymethod(element);      
    if(groupedTrans.hasOwnProperty(dt))groupedTrans[dt].push(element);
    else groupedTrans[dt] = Array(element);
  });
  let result=[];
  Object.keys(groupedTrans).forEach( key => result.push([key, groupedTrans[key]]));   
  return result;
}

const toastController = new ToastController();
export async function presentToast(message){
  const toast = await toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();   
}    

const alertController =  new AlertController();
export async function presentAlert(message,opt={header:'Alert', subheader:""}) {
  const alert = await alertController.create({
    header: opt.header||'Alert',
    subHeader: opt.subheader||'',
    message: message,
    buttons: ['OK']
  });

  await alert.present();
}

export function loadScript(scriptURL) {        
  var isFound = false;
  var scripts = document.getElementsByTagName("script")
  for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
          isFound = true;
      }
  }

  if (!isFound) {
      var dynamicScripts = [scriptURL];

      for (var i = 0; i < dynamicScripts.length; i++) {
          let node = document.createElement('script');
          node.src = dynamicScripts [i];
          node.type = 'text/javascript';
          node.async = false;
          node.charset = 'utf-8';
          document.getElementsByTagName('head')[0].appendChild(node);
      }

  }
}


export function addDaysToDate(date:Date, days:number){
  date.setDate(date.getDate() + days);
  return date;
}

export function limitInputFieldLength(event, elem_selector=null, max_lenth=10){
  if(event.detail.target.value.length > max_lenth){
    event.detail.preventDefault();
    event.detail.stopPropagation();
    event.detail.returnValue=false;
    event.detail.cancelBubble=true;
    event.detail.cancel=true;
    event.srcElement.value = event.srcElement.value.substring(0,max_lenth);
    (<HTMLInputElement>document.querySelector(elem_selector?elem_selector:'input[type="number"]')).value= event.srcElement.value.substring(0,max_lenth);
    return false;
  }
  return true;  
}


export function formatDecimalNumber(e: any, separador: string = '.', decimais: number = 2) {
  let a:any = e.value.split('');
  let ns:string = '';
  a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
  ns = parseInt(ns).toString();
  if (ns.length < (decimais+1)) { ns = ('0'.repeat(decimais+1) + ns); ns = ns.slice((decimais+1)*-1); }
  let ans = ns.split('');
  let r = '';
  for (let i=0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
  console.debug(r, 'r....___');
  e.value = r;
}

export function getUrlParams(search) {
  const hashes = search.slice(search.indexOf('?') + 1).split('&')
  const params = {}
  hashes.map(hash => {
      const [key, val] = hash.split('=')
      params[key] = decodeURIComponent(val)
  })
  return params;
}
