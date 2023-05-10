import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/store';
import { GiWorld } from 'react-icons/gi';
import {AiOutlineMenu} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IoMdContact } from "react-icons/io";
import { BiBarChartSquare } from "react-icons/bi";

export default function ChartsAndMaps() {

  const [chartWidth, setChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(300);
  const Shows = useSelector(state => state.ChartsAndMapState.show)
  const showTotal = useSelector(state => state.ChartsAndMapState.showtotal)
  const graphData = useSelector(state => state.ChartsAndMapState.graphData)
  const totalData = useSelector(state => state.ChartsAndMapState.totalData)
  const countriesData = useSelector(state => state.ChartsAndMapState.countriesData)
  const toggle = useSelector(state => state.Sidebar.toggle);
  const showMenu = useSelector(state => state.Sidebar.showMenu);

  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        dispatch(actions.setTotalData(data))
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
        dispatch(actions.setCoutriesData(data))
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
      .then(response => response.json())
      .then(data => {
        // Transform data into an array of objects with keys "date", "cases", "deaths", and "recovered"
        const transformedData = Object.keys(data.cases).map(date => ({
          date: new Date(date).getDate() + '/' + new Date(date).getMonth() + '/' + (new Date(date).getFullYear() % 100),
          cases: data.cases[date],
          deaths: data.deaths[date],
          recovered: data.recovered[date],
        }));

        dispatch(actions.setGraphData(transformedData))
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartWidth(330);
        setChartHeight(230);
      } else {
        setChartWidth(400);
        setChartHeight(300);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatYAxisTick = (tickValue) => {
    if (tickValue >= 100000) {
      return `${(tickValue / 1000000).toFixed(1)}m`;
    }
    return tickValue;
  };

  return (
    <div className={`${toggle ? 'w-5/6 xl:w-5/6 lg:w-5/6 md:w-5/6 sm:w-full xs:w-full 2xs:w-full' : 'w-11/12'} font-mono`}>
      <div className='flex 2xl:justify-center xl:justify-center lg:justify-center md:justify-center py-2 space-x-5 h-[7vh] border bg-slate-100 w-full'>
        <div className='2xl:hidden xl:hidden lg:hidden md:hidden sm:pl-5 xs:pl-5 2xs:pl-5' onClick={() => dispatch(actions.setShowMenu())}><AiOutlineMenu className='w-2/5 h-full'></AiOutlineMenu></div>
        <div className={`z-50 ${showMenu ? '' : 'hidden'} w-2/3 2xl:hidden xl:hidden lg:hidden md:hidden absolute top-12  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-black`}>
            <ul class="py-4 w-full text-sm text-white ">
                <Link to='/' className='hover:bg-slate-100  hover:text-black cursor-pointer'>
                    <div className='hover:bg-slate-100 hover:text-black cursor-pointer flex items-center px-4 py-2'><span><IoMdContact className='pr-2 w-full'></IoMdContact></span>Contacts</div> 
                </Link>
                <Link to='/charts' className='hover:bg-slate-100 hover:text-black cursor-pointer'>
                    <div className='hover:bg-slate-100 hover:text-black cursor-pointer flex items-center px-4 py-2'><span><BiBarChartSquare className='pr-2 w-full'></BiBarChartSquare></span>Charts & Maps</div>
                </Link>

            </ul>
          </div>
        <button className='py-1 px-7 bg-green-600 rounded-sm shadow-md text-white hover:bg-green-500' onClick={() => dispatch(actions.setShow('showMap'))}>World Map</button>
        <button className='py-1 px-7 bg-red-500 rounded-sm shadow-md text-white hover:bg-red-400' onClick={() => dispatch(actions.setShow('showGraph'))}>Graph</button>
      </div>
      <div className='bg-slate-50 h-[80vh] '>
        {console.log(totalData.cases)}
        {Shows === 'showGraph' && <>
          <div className='flex justify-end items-center h-[10vh] pr-10'>
            <GiWorld className='h-14 w-16 relative cursor-pointer bg-white p-3 rounded-md shadow-md hover:bg-slate-100' onClick={() => dispatch(actions.setShowTotal())}></GiWorld>
            {showTotal &&
              <div className='p-5 absolute rounded-md right-20 top-28 bg-white z-10'>
                <p>Total Cases : {totalData.cases}</p>
                <p>Total Recovered : {totalData.recovered}</p>
                <p>Total Death : {totalData.deaths}</p>
              </div>}
          </div>
          <div className='flex flex-col justify-center -z-10'>
            <div className='flex justify-center 2xl:flex-row  xl:flex-row lg:flex-row md:flex-col md:items-center sm:flex-col sm:items-center xs:flex-col xs:items-center 2xs:flex-col 2xs:items-center'>
              <LineChart width={chartWidth} height={chartHeight} className="line-chart" data={graphData} >
                <XAxis dataKey="date" />
                <YAxis tickFormatter={formatYAxisTick}  domain={[6000000000, ]}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="red" />
              </LineChart>
              <LineChart width={chartWidth} height={chartHeight} className="line-chart" data={graphData} >
                <XAxis dataKey="date" />
                <YAxis tickFormatter={formatYAxisTick} domain={[6000000000, ]}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="deaths" stroke="black" />
              </LineChart>
            </div>
            <div className='flex justify-center'>
              <LineChart width={chartWidth} height={chartHeight} data={graphData} >
                <XAxis dataKey="date" />
                <YAxis tickFormatter={formatYAxisTick} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="recovered" stroke="green" />
              </LineChart>
            </div>

          </div>
        </>}
        {Shows === 'showMap' && <div className='flex justify-center items-center'>
          <MapContainer center={[22.160308, 79.284888]} zoom={5} scrollWheelZoom={true} className='h-[93vh] w-full'>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {countriesData.map(country => (
              <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
                <Popup>
                  <h3>{country.country}</h3>
                  <p>Total Active Cases: {country.cases}</p>
                  <p>Total Recovered Cases: {country.recovered}</p>
                  <p>Total Deaths: {country.deaths}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>}
      </div>
    </div>

  )
}


