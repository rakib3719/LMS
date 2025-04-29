'use client';
import "../../app/globals.css";
import Sidebar from "../../components/dashboard/Sidebar";
import useAuthToken from "../hooks/useAuthToken";
import { useEffect } from "react";
import Header from "../../components/dashboard/Header";





export default function RootLayout({ children }) {
    

//    useEffect(()=>{

// const {token} = useAuthToken()
// console.log(token, 'token from layout');

//    },[])

    return (
     
          
                <div className="relative" >
                                

                    <section className="flex">
                       
                          <Sidebar />

                        <div className="w-full min-h-screen   ">
                            <Header />
                            <div className="p-[5%] ">
                                {children}
                            </div>
                        </div>
                    </section>
                </div>
          
      
    );
}