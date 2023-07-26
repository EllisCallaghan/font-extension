import React from 'react';
import logo from '@assets/img/logo.svg';
import axios from 'axios';
import { url } from 'inspector';
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
const FontArray:Array<any> = []


async function getFonts(domain){
  let ReqString = `https://api.geturldata.com/v1/get?access_key=${import.meta.env.ACCESS_KEY}&url=`
   return axios.get(ReqString.concat(domain))
  .then((res) => {
    //console.log(res)
    return res
  })
}

async function getRes(){
  return getCurrentTab().then((val) =>{
    return val.url
    
  })
  .catch((error) =>(
    console.log(error)
  ))

  }


  const PageUrl:any = await getRes()
  console.log(PageUrl)
  const Fonts = await getFonts(PageUrl)
  console.log(Fonts.data.fonts)
export default  function Popup(): JSX.Element {
 
  return (

      <header className="flex w-[500px] h-[500px] p-3
       flex-col items-start gap-8 justify-start text-black">
        <div className='flex flex-col flex-wrap'>
          <h1 className='text-4xl '>Current Page:</h1>
          <p>{PageUrl}</p>
          </div>
        <div className='flex flex-col gap-5'>
          <p className='text-4xl'>Fonts used on this page:</p>
          {Fonts.data.fonts.map((item) =>(
            <div className='flex flex-col'>
              <div className='text-[#3f37c9] text-3xl'>{item.first}</div>
              <div className='flex flex-row flex-wrap'>fallback fonts:
                {item.fallback.map((fallback) =>(
                <><p>{fallback}</p><span className='block last:hidden'>,&nbsp;</span></>
              ))}</div>
              <div className='flex flex-row'>
                Elements:
                {item.elements.map((elm) =>(
                <><p>{elm}</p><span className='block last:hidden'>,&nbsp;</span></>
                ))}
              </div>
            </div>
            
          ))}
        </div>
      </header>

  );
}