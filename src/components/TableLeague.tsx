import { useEffect, useState } from "react";
import axios from "axios";
import AddPlayer from "../modales/AddPlayer";
import AddMatch from "../modales/AddMatch";
import NextMatch from "./NextMatch";
import RecentMatches from "./RecentMatches";
import { PlayerAttendance } from "../interfaces/interfaces";
import Ingreso from "../modales/Ingreso";
import AddLeague from "../modales/AddLeague";
import { Streak } from "./Streak";
import { Assistance } from "./Assistance";
export function TableLeague() {
  const [loginModal, setLoginModal] = useState(false);
  const [addPlayer, setAddPlayer] = useState(false);
  const [addMatch, setAddMatch] = useState(false);
  const [addLeague, setAddLeague] = useState(false);
  const [nextMatch, setNextMatch] = useState<any>({});
  const [recentMatches, setRecentMatches] = useState([]);
  const [leagueData, setLeagueData] = useState<any>([]);
  const [players, setPlayers] = useState<any>([]);
  const [leaguesData, setLeaguesData] = useState<any>([]);
  const [firePlayers, setFirePlayers] = useState([]);
  const [coldPlayers, setColdPlayers] = useState([]);
  const [attendance, setAttendance] = useState<Array<PlayerAttendance>>([]);
  const [ligasTotales, setLigasTotales] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [refresh, setRefresh] = useState<any>(false);
  const [shortBy, setShortBy] = useState("empty");
  const [admin, setAdmin] = useState(false);
  const [leagueName, setLeagueName] = useState("FutbolMiercoles");

  useEffect(() => {
    const fetchData = async () => {
      const accessToken: any = localStorage.getItem("token");
      console.log(accessToken, "1");
      if (accessToken) {
        const tokenData = JSON.parse(atob(accessToken.split(".")[1]));
        if (tokenData.admin) {
          console.log(tokenData, "tokendata?");
          setAdmin(true);
        }
      }
      try {
        console.log(leagueName, "nombre de liga");
        const resp = await axios.get(
          `https://f5be.onrender.com/league/${encodeURIComponent(
            leagueName
          )}/${shortBy}`
        );
        console.log(resp, "respssss");
        setLigasTotales(resp.data.allLeagues);
        setLeagueData(resp.data.league);
        setLeaguesData(resp.data.league);
        setPlayers(resp.data.players);
        setRecentMatches(resp.data.recentMatches);
        setColdPlayers(resp.data.losingplayers);
        setFirePlayers(resp.data.fireplayers);
        setAttendance(resp.data.perfectAttendence);
        setLoading(false);
        setNextMatch(resp.data.lastMatch);
        console.log(leagueData, "leaguedata");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setRefresh(false);
  }, [refresh, shortBy]);
  console.log(leagueData, "dassdadsadsa");
  console.log(shortBy, "filter");
  if (!loading) {
    return (
      <section className="flex justify-start flex-col items-center w-full h-auto mb-2 bg-green-100 min-h-screen">
        <div className="flex flex-row justify-between items-center font-semibold p-4 w-full text-center space-x-1">
          <h1 className="w-full bg-yellow-300 rounded-full">Donaciones</h1>
          <h1 className="w-full font-bold text-lg">FUTBOL 5 APP</h1>
          <button
            onClick={() => setLoginModal(true)}
            className="w-full bg-yellow-300 rounded-full"
          >
            Ingreso
          </button>
        </div>
        <select
          onChange={(e: any) => {
            console.log(e.target.value, "VALUEEEEEEEEE");
            setLeagueName(e.target.value);
            setRefresh(true);
          }}
          className="flex justify-center items-center rounded-lg my-4 border border-green-500 bg-green-100"
        >
          <option>CAMBIAR LIGA</option>;
          {ligasTotales &&
            ligasTotales.map((e: any) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
        </select>
        <div className="flex justify-around items-center flex-row bg-green-200 w-full">
          <div className="flex flex-row justify-center items-center font-bold uppercase space-x-2">
            <svg
              version="1.0"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 64 64"
              enableBackground="new 0 0 64 64"
              fill="#ffc800"
              stroke="#ffc800"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path
                    fill="#231F20"
                    d="M60,6h-7V4c0-2.212-1.789-4-4-4H15c-2.211,0-4,1.788-4,4v2H4c-2.211,0-4,1.788-4,4v8 c0,6.074,4.925,11,11,11h0.096C12.01,38.659,19.477,46.395,29,47.761V56h-7c-2.211,0-4,1.788-4,4v3c0,0.552,0.447,1,1,1h26 c0.553,0,1-0.448,1-1v-3c0-2.212-1.789-4-4-4h-7v-8.239c9.523-1.366,16.985-9.1,17.899-18.761H53c6.075,0,11-4.926,11-11v-8 C64,7.788,62.211,6,60,6z M11,23c-2.762,0-5-2.239-5-5v-6h5V23z M2,18v-8c0-1.105,0.896-2,2-2h7v2H5c-0.553,0-1,0.446-1,1v7 c0,3.865,3.134,7,7,7v2C6.029,27,2,22.97,2,18z M42,58c1.104,0,2,0.895,2,2v2H20v-2c0-1.105,0.896-2,2-2H42z M31,56v-8.052 C31.334,47.964,31.662,48,32,48s0.666-0.036,1-0.052V56H31z M51,27c0,10.492-8.507,19-19,19s-19-8.508-19-19V4c0-1.105,0.896-2,2-2 h34c1.104,0,2,0.895,2,2V27z M53,12h5v6c0,2.761-2.238,5-5,5V12z M62,18c0,4.97-4.029,9-9,9v-2c3.866,0,7-3.135,7-7v-7 c0-0.554-0.447-1-1-1h-6V8h7c1.104,0,2,0.895,2,2V18z"
                  ></path>{" "}
                  <path
                    fill="#231F20"
                    d="M39.147,19.36l-4.309-0.658l-1.936-4.123c-0.165-0.352-0.518-0.575-0.905-0.575s-0.74,0.224-0.905,0.575 l-1.936,4.123l-4.309,0.658c-0.37,0.058-0.678,0.315-0.797,0.671s-0.029,0.747,0.232,1.016l3.146,3.227l-0.745,4.564 c-0.062,0.378,0.099,0.758,0.411,0.979s0.725,0.243,1.061,0.059l3.841-2.123l3.841,2.123C35.99,29.959,36.157,30,36.323,30 c0.202,0,0.404-0.062,0.576-0.184c0.312-0.221,0.473-0.601,0.411-0.979l-0.745-4.564l3.146-3.227 c0.262-0.269,0.352-0.66,0.232-1.016S39.518,19.418,39.147,19.36z M34.781,23.238c-0.222,0.228-0.322,0.546-0.271,0.859 l0.495,3.029l-2.522-1.395c-0.151-0.083-0.317-0.125-0.484-0.125s-0.333,0.042-0.484,0.125l-2.522,1.395l0.495-3.029 c0.051-0.313-0.05-0.632-0.271-0.859l-2.141-2.193l2.913-0.446c0.329-0.05,0.612-0.261,0.754-0.563l1.257-2.678l1.257,2.678 c0.142,0.303,0.425,0.514,0.754,0.563l2.913,0.446L34.781,23.238z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <h1>{leagueData && leagueData.name}</h1>
          </div>
        </div>
        <div className="flex justify-around items-center flex-row bg-green-200 w-full">
          <div className="flex flex-row justify-center items-center font-bold uppercase space-x-2 mt-4">
            <div className="flex flex-col justify-center items-center space-x-4 font-semibold text-sm ">
              <svg
                fill="#11a63e"
                height="30px"
                width="30px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                stroke="#11a63e"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M507.733,108.793l-42.667-32c-3.2-2.411-7.531-2.795-11.157-1.003c-3.627,1.813-5.909,5.504-5.909,9.536v95.637 c-36.373-10.987-89.323-16.235-132.075-18.709c-1.088-0.853-2.347-1.515-3.776-1.899c-2.923-0.789-5.888-0.235-8.32,1.259 c-20.373-1.024-37.44-1.387-47.829-1.536v-26.752l38.4-28.8c2.688-2.005,4.267-5.184,4.267-8.533c0-3.349-1.579-6.528-4.267-8.533 l-42.667-32c-3.2-2.411-7.552-2.795-11.157-1.003c-3.627,1.813-5.909,5.504-5.909,9.536v96.085 c-10.389,0.149-27.435,0.533-47.787,1.515c-2.432-1.472-5.397-2.027-8.32-1.237c-1.429,0.384-2.688,1.045-3.776,1.877 c-52.181,3.029-119.637,10.155-153.451,26.837V154.66l38.4-28.8c2.688-2.005,4.267-5.184,4.267-8.533 c0-3.349-1.579-6.528-4.267-8.533l-42.667-32c-3.2-2.411-7.531-2.795-11.157-1.003C2.283,77.604,0,81.295,0,85.327v128 c0,1.067,0.085,2.091,0.277,3.115l21.056,188.885c0,52.736,214.848,53.333,224,53.333c9.152,0,224-0.597,223.936-52.139 l21.12-190.08c0.192-1.024,0.277-2.069,0.277-3.093c0-0.021,0-0.021,0-0.021c0-9.792-8.107-17.771-21.333-24.277V154.66 l38.379-28.8c2.709-2.005,4.288-5.184,4.288-8.533C512,113.977,510.421,110.799,507.733,108.793z M256,85.327l14.229,10.667 L256,106.66V85.327z M21.333,106.66l14.229,10.667l-14.229,10.667V106.66z M316.949,183.353 c33.664,1.984,62.101,5.269,85.013,9.109l-36.267,45.333c-0.341,0.448-0.469,0.96-0.747,1.451c-0.64,0.064-1.28,0.149-1.941,0.213 c-2.304,0.256-4.523,0.512-6.891,0.768c-3.904,0.384-8.043,0.725-12.139,1.088c-2.411,0.213-4.715,0.448-7.189,0.64 c-4.309,0.341-8.875,0.619-13.397,0.917c-2.475,0.171-4.864,0.341-7.403,0.491c-4.715,0.277-9.664,0.491-14.571,0.704 c-0.363,0.021-0.704,0.043-1.045,0.043L316.949,183.353z M245.333,181.327c17.557,0,34.133,0.341,49.771,0.96l-17.067,62.571 c-0.384,0-0.747,0.021-1.109,0.043c-2.24,0.064-4.395,0.149-6.677,0.192c-8.085,0.149-16.384,0.235-24.917,0.235 c-8.64,0-17.067-0.085-25.237-0.235c-2.56-0.043-4.928-0.149-7.445-0.213l-17.067-62.592 C211.221,181.668,227.797,181.327,245.333,181.327z M173.76,183.332l16.576,60.779c-23.936-1.045-45.483-2.731-64.576-4.843 c-0.277-0.491-0.405-1.045-0.768-1.515l-36.245-45.291C111.68,188.623,140.032,185.316,173.76,183.332z M21.632,213.668 c3.115-4.821,18.091-11.029,43.861-16.725c0.299,0.576,0.448,1.173,0.875,1.707l29.397,36.736 C51.093,228.559,25.515,219.705,21.632,213.668z M298.667,435.94c-16.555,0.853-34.24,1.365-53.333,1.365 c-19.093,0-36.757-0.512-53.333-1.365v-51.947c0-5.888,4.779-10.667,10.667-10.667H288c5.888,0,10.667,4.779,10.667,10.667V435.94 z M448.064,404.815c-3.669,9.109-48.469,23.808-128.064,29.803v-50.624c0-17.643-14.357-32-32-32h-85.333 c-17.621,0-32,14.357-32,32v50.603c-79.595-6.016-124.395-20.821-128.064-30.443L24.256,238.991 c0.427,0.192,0.96,0.341,1.387,0.533c3.285,1.429,6.741,2.816,10.496,4.096c0.213,0.064,0.384,0.149,0.597,0.213 c3.947,1.344,8.213,2.56,12.587,3.755c0.939,0.256,1.899,0.512,2.859,0.768c4.373,1.131,8.896,2.197,13.611,3.179 c0.747,0.149,1.493,0.299,2.24,0.448c4.331,0.896,8.768,1.728,13.291,2.496c0.939,0.171,1.877,0.341,2.816,0.491 c4.949,0.832,10.005,1.6,15.125,2.304c1.173,0.171,2.347,0.32,3.52,0.469c5.056,0.683,10.133,1.323,15.253,1.899 c0.235,0.021,0.469,0.064,0.725,0.085c5.355,0.597,10.731,1.131,16.064,1.643c1.173,0.107,2.325,0.213,3.477,0.32 c5.163,0.469,10.304,0.896,15.36,1.28c0.896,0.064,1.771,0.128,2.667,0.192c4.523,0.341,8.981,0.64,13.355,0.896 c0.981,0.085,1.941,0.149,2.901,0.213c4.757,0.277,9.344,0.533,13.824,0.747c1.173,0.064,2.283,0.107,3.435,0.171 c4.139,0.192,8.171,0.363,11.989,0.512c0.427,0.021,0.875,0.043,1.301,0.043c0.363,0.021,0.661,0.021,1.024,0.043 c0.085,0,0.149,0.085,0.235,0.085c0.149,0,0.277-0.064,0.427-0.064c3.477,0.128,6.763,0.235,9.877,0.32 c0.747,0.021,1.472,0.043,2.197,0.064c3.435,0.085,6.635,0.171,9.536,0.235c0.789,0.021,1.451,0.021,2.197,0.043 c2.411,0.043,4.587,0.085,6.528,0.107c0.427,0,0.853,0.021,1.237,0.021c2.091,0.021,3.797,0.043,5.205,0.043 c0.683,0,1.045,0,1.557,0c0.939,0,1.685,0,2.069,0h0.107c0.384,0,1.195,0,2.219,0c0.469,0,0.789,0,1.387,0 c1.451,0,3.221-0.021,5.397-0.043c0.277,0,0.576,0,0.853-0.021c2.091-0.021,4.459-0.064,7.104-0.107 c0.597-0.021,1.109-0.021,1.749-0.021c3.008-0.064,6.357-0.149,9.92-0.235c0.555-0.021,1.109-0.043,1.685-0.043 c2.987-0.085,6.123-0.192,9.429-0.299c0.384,0.043,0.768,0.149,1.173,0.149c0.235,0,0.427-0.213,0.661-0.213 c0.363-0.021,0.683-0.021,1.045-0.043c0.064,0,0.107,0,0.171,0c4.117-0.149,8.491-0.341,12.992-0.555 c0.96-0.043,1.899-0.085,2.901-0.128c4.608-0.235,9.344-0.491,14.229-0.768c0.768-0.043,1.557-0.107,2.347-0.149 c4.608-0.277,9.301-0.597,14.08-0.96c0.725-0.064,1.429-0.107,2.155-0.149c5.163-0.384,10.411-0.832,15.68-1.301 c1.045-0.085,2.069-0.192,3.093-0.299c5.44-0.512,10.901-1.045,16.363-1.664c0.085,0,0.171-0.021,0.256-0.021 c5.291-0.597,10.539-1.259,15.765-1.963c1.109-0.149,2.197-0.299,3.307-0.448c5.163-0.725,10.261-1.493,15.253-2.325 c0.896-0.149,1.771-0.32,2.645-0.469c4.608-0.789,9.109-1.643,13.504-2.539c0.704-0.149,1.429-0.277,2.112-0.427 c4.715-1.003,9.259-2.069,13.653-3.2c0.96-0.235,1.877-0.491,2.816-0.747c4.395-1.195,8.661-2.411,12.608-3.755 c0.192-0.064,0.363-0.149,0.576-0.213c3.776-1.28,7.232-2.667,10.539-4.096c0.427-0.192,0.96-0.341,1.387-0.533L448.064,404.815z M467.925,214.265c-0.363,0.363-0.683,0.704-1.152,1.067c-0.576,0.448-1.344,0.896-2.091,1.365 c-0.597,0.363-1.152,0.725-1.856,1.109c-0.917,0.491-2.005,0.981-3.093,1.472c-0.811,0.363-1.557,0.725-2.475,1.109 c-1.237,0.512-2.688,1.024-4.117,1.557c-1.024,0.363-1.963,0.747-3.072,1.109c-1.579,0.533-3.349,1.045-5.099,1.579 c-1.237,0.363-2.389,0.747-3.712,1.109c-1.899,0.533-4.032,1.067-6.123,1.6c-1.408,0.363-2.731,0.725-4.224,1.067 c-2.283,0.555-4.8,1.088-7.296,1.621c-1.536,0.341-3.008,0.683-4.608,1.003c-2.667,0.555-5.568,1.067-8.427,1.6 c-1.685,0.32-3.264,0.619-5.013,0.939c-2.923,0.512-6.08,1.003-9.195,1.493c-0.448,0.064-0.875,0.128-1.301,0.213l29.291-36.608 c0.427-0.533,0.576-1.152,0.875-1.728c24.981,5.525,39.936,11.541,43.669,16.299C468.629,213.583,468.288,213.924,467.925,214.265 z M469.333,127.993V106.66l14.229,10.667L469.333,127.993z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              <h1>{leagueData && leagueData.stadium}</h1>
            </div>
            <div className="flex flex-col justify-center items-center space-x-2 font-semibold text-sm">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M7 4V2.5"
                    stroke="#d7da2b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M17 4V2.5"
                    stroke="#d7da2b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M9 14.5L10.5 13V17"
                    stroke="#d7da2b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M13 16V14C13 13.4477 13.4477 13 14 13C14.5523 13 15 13.4477 15 14V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16Z"
                    stroke="#d7da2b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M21.5 9H16.625H10.75M2 9H5.875"
                    stroke="#d7da2b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3002 21.7706 18 21.8985"
                    stroke="#d7da2b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                </g>
              </svg>
              <h1>
                {leagueData && leagueData.days} -{" "}
                {leagueData && leagueData.hour}
              </h1>
            </div>
          </div>
        </div>
        {admin ? (
          <div className="flex justify-around items-center flex-row bg-green-200 w-full h-[50px] p-2">
            <button
              onClick={() => setAddMatch(true)}
              className="flex flex-col justify-center items-center bg-green-300 h-[40px] w-auto p-2 rounded-lg"
            >
              Añadir Partido
            </button>
            <button
              onClick={() => setAddPlayer(true)}
              className="flex flex-col justify-center items-center bg-green-300 h-[40px] w-auto p-2 rounded-lg"
            >
              Añadir Jugador
            </button>
            <button
              onClick={() => setAddLeague(true)}
              className="flex flex-col justify-center items-center bg-green-300 h-[40px] w-auto p-2 rounded-lg"
            >
              Añadir Liga
            </button>
          </div>
        ) : null}
        {nextMatch && (
          <NextMatch
            actualize={() => setRefresh(true)}
            nextMatch={nextMatch}
            admin={admin}
          />
        )}
        <div className="flex flex-row w-full bg-green-300 h-[40px] border-b-2 border-white">
          <div className="flex justify-center items-center h-full w-[80px] bg-green-600 border-r border-white"></div>
          <div className="flex justify-center items-center h-full w-full bg-green-600">
            Nombre
          </div>
          <button
            onClick={() => setShortBy("matchesplayed")}
            className="flex justify-center items-center h-full w-[80px] bg-yellow-600 border-l border-white"
          >
            PJ
          </button>
          <button
            onClick={() => setShortBy("matcheswinning")}
            className="flex justify-center items-center h-full w-[80px] bg-green-600 border-l border-white"
          >
            PG
          </button>
          <button
            onClick={() => setShortBy("matchestied")}
            className="flex justify-center items-center h-full w-[80px] bg-yellow-300 border-l border-white"
          >
            PE
          </button>
          <button
            onClick={() => setShortBy("matcheslosing")}
            className="flex justify-center items-center h-full w-[80px] bg-red-600 border-l border-white"
          >
            PP
          </button>
        </div>
        <section className="flex flex-col justify-start items-center h-full w-full space-y-1">
          {players &&
            players.map((e: any) => {
              return (
                <div
                  key={e.id}
                  className="flex flex-row w-full bg-green-300 h-[40px]"
                >
                  <div className="w-[80px] h-full">
                    <img
                      className="flex justify-center items-center h-full w-full bg-green-600 border-r border-white"
                      src={e.image}
                      alt=""
                    ></img>
                  </div>
                  <div className="flex justify-center items-center h-full w-full bg-green-600">
                    {e.fullname}
                  </div>
                  <div className="flex justify-center items-center h-full w-[80px] border-l border-white bg-green-600">
                    {e.matchesPlayed}
                  </div>
                  <div className="flex justify-center items-center h-full w-[80px] border-l border-white bg-green-600">
                    {e.winnerCount}
                  </div>
                  <div className="flex justify-center items-center h-full w-[80px] border-l border-white bg-green-600">
                    {e.tieCount}
                  </div>
                  <div className="flex justify-center items-center h-full w-[80px] border-l border-white bg-green-600">
                    {e.loserCount}
                  </div>
                </div>
              );
            })}
        </section>
        {coldPlayers || firePlayers ? (
          <Streak coldPlayers={coldPlayers} firePlayers={firePlayers} />
        ) : null}
        {attendance && <Assistance assistanceList={attendance} />}
        <div className="flex flex-col justify-start items-center w-full">
          <h1 className="font-semibold text-xl justify-center">
            Partidos Recientes
          </h1>
          {recentMatches && <RecentMatches recentMatches={recentMatches} />}
        </div>
        {addMatch && (
          <AddMatch
            onCancel={() => setAddMatch(false)}
            leagues={leagueData}
            actualize={() => console.log("REFRESCA????????????")}
          />
        )}
        {addPlayer && (
          <AddPlayer
            onCancel={() => setAddPlayer(false)}
            leagues={leaguesData}
            actualize={() => setRefresh(true)}
          />
        )}
        {loginModal && (
          <Ingreso
            onCancel={() => setLoginModal(false)}
            actualize={() => setRefresh(true)}
          />
        )}
        {addLeague && (
          <AddLeague
            onCancel={() => setAddLeague(false)}
            actualize={() => setRefresh(true)}
          />
        )}
      </section>
    );
  } else {
    return (
      <div className="w-full h-screen flex justify-center flex-col space-y-3 items-center text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <h1 className="text-lg font-semibold text-black">
          Sí queda cargando entra en 2 minutos.
        </h1>
        <h1 className="text-lg font-semibold text-black">
          El server es gratuito y se prende cada vez que hay actividad.
        </h1>
      </div>
    );
  }
}
