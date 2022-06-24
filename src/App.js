import { useEffect, useState } from "react";

let apiKey = 'c3123a1c5ed03c33bfc9675f7f9a2f6d';

let alp = 'abcdefghijklmnopqrstuvwxyz'

function App() {

  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [bigData, setBigData] = useState({});
  const [bigData5, setBigData5] = useState({});



  useEffect(() => {

    if (alp.includes(lat[lat.length - 1])) {
      alert('Please enter number')
      setLat('')
      return
    }
    if (alp.includes(lon[lon.length - 1])) {
      alert('Please enter number')
      setLon('')
      return
    }

    async function fetchFunc() {

      try {


        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);



        if (!response.ok) {

          throw new Error(response)
        }




        const json = await response.json();




        setBigData(json);

      } catch (e) {
        setBigData({});

        if (lat !== '' && lon !== '') {
          alert('Wrong courdinates')
        }
      }


      const some = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
      const response = await fetch(some.url);
      const json = await response.json()
      console.log(json);

      setBigData5(json)

    }



    fetchFunc()


  }, [lat, lon]);

  return (
    <>
      <h1>Hello from Weather App</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

        <label htmlFor='as'>Enter Latitude</label>
        <input style={{ width: "100px" }} name="as" value={lat} type="text" onChange={(e) => setLat(e.target.value)}>
        </input>

        <label htmlFor='ass'>Enter Longitude</label>
        <input style={{ width: "100px" }} name="ass" value={lon} type="text" onChange={(e) => setLon(e.target.value)}>
        </input>
      </div>


      <div>
        <p>City: {bigData.name ? bigData.name : 'No name found for these courdinates'}</p>
        <p>Country: {bigData.sys?.country ? bigData.sys.country : 'No country name found for these courdinates'}</p>
        <p>Temperture: {bigData.main?.temp ? bigData.main?.temp : 'Couldnt find the right temperture'}</p>

        <p>Description: {
          bigData?.weather?.length &&
            bigData?.weather[0]?.description ? bigData.weather[0]?.description : 'No description found here'}</p>

      </div>
    </>
  );
}

export default App;
