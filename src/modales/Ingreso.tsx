import { useState } from "react";
import axios from "axios";
export default function Ingreso({ onCancel, actualize }: any) {
  const [user, setUser] = useState({
    fullname: "",
    password: "",
  });
  const [errormsg, seterrormsg] = useState("");

  const handleChange = (field: any, value: any) => {
    setUser((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    console.log(user, "userrrrrr");
    if (!user.fullname || !user.password) {
      seterrormsg("Completar todos los campos requeridos.");
    }

    try {
      const resp: any = await axios.post(
        `https://f5be.onrender.com/players/login`,
        user
      );
      console.log(resp, "respdellogin");
      localStorage.setItem("token", resp.data.token);
      onCancel();
      actualize();
    } catch (err) {
      console.log(err);
      seterrormsg("Credenciales incorrectas, intentá de nuevo.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800  opacity-50"></div>
      <div className="p-6 rounded shadow-md z-10 w-[350px] h-auto bg-green-700">
        <h1 className="text-center text-xl font-semibold uppercase h-auto">
          Ingreso
        </h1>
        <div className="flex flex-col justify-center items-start h-full w-full">
          <div className="flex justify-center items-center w-full flex-col my-4">
            <label className="text-xl font-medium text-black w-full">
              Usuario
            </label>
            <input
              onInput={(e: any) => handleChange("fullname", e.target.value)}
              className="w-full p-2 rounded-lg bg-green-400"
            ></input>
          </div>
          <div className="flex justify-center items-center w-full flex-col my-4">
            <label className="text-xl font-medium text-black w-full">
              Contraseña
            </label>
            <input
              onInput={(e: any) => handleChange("password", e.target.value)}
              className="w-full p-2 rounded-lg bg-green-400"
            ></input>
          </div>
        </div>
        <h1 className="h-[40px] w-full text-center text-red-700">
          {errormsg && errormsg}
        </h1>
        <div className="flex flex-row w-full justify-center items-center h-auto space-x-4">
          <button
            className="bg-red-600 text-white font-semibold p-2 rounded-md"
            onClick={() => onCancel()}
          >
            Cerrar
          </button>
          <button
            onClick={() => handleLogin()}
            className="bg-green-400 text-white font-semibold p-2 rounded-md"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}
