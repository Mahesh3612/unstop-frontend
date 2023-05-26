import React, { useEffect, useState } from 'react';
import './SeatBooking.css';
import axios from "axios"


const SeatBooking = () => {
    const [totalSeats, setTotalSeats] = useState([]);
    const [noOfSeats,setNoOfSeats] = useState(0)


    async function BookSeats(){
       await axios.post(`https://tame-gold-scorpion-gown.cyclic.app/api/booking?noOfSeats=${noOfSeats}`)

    }

    async  function cancelSeat(){
        await axios.post(`https://tame-gold-scorpion-gown.cyclic.app/api/cancel?seatNO=${noOfSeats}`)
        }

    useEffect(()=>{
       setTimeout(()=>{
        ShowSeats()
       },3000)
    },[])

    
    async function ShowSeats(){
        
        let data =  await axios.get(`https://tame-gold-scorpion-gown.cyclic.app/api`)
            setTotalSeats(data.data)
     }

    function GetNumber(e){
        setNoOfSeats(e.target.value)
    }



    return (
        <div className="seat-booking-container">
            <h1>Seat Booking System</h1>
            <form >
                <label>
                    <input
                    placeholder='enter number of seats'
                        type="number"
                        min="1"
                        max="7"
                        onChange={(e)=>GetNumber(e)}
                    />
                    <button onClick={BookSeats}>book seats</button>
                </label>

                <label>
                    <input
                    placeholder='enter seat number'
                        type="number"
                        min="1"
                        max="80"
                        onChange={(e)=>GetNumber(e)}
                    />
                    <button onClick={cancelSeat}>cancel seat</button>
                </label>
                
                <div className="seat-container">

                    { totalSeats.length > 0? totalSeats.map((e)=>{
                        return(<div style={{"backgroundColor": e.isBooked ? "red" : "green"}}
                        key={e.seatNo}
                            className={`seat`}
                        >
                            {e.seatNo}
                        </div>)
                    }): <h1>Loading..</h1>}

                </div>

            </form>
        </div>
    );
};

export default SeatBooking;
