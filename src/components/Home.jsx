import { addDoc,collection,getDocs  } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Peep from './Peep';
import PeepForm from './PeepForm';
import { db } from '../config';


import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";


export default function Home(props){
    const updatePeepsList = props.updatePeepsList
    const peepsObjects = props.peepsObjects
   
    const peepElms = peepsObjects.map((peep)=>{
      return(
     
        <Peep updatePeepsList={updatePeepsList} peep={peep} />
  
      )
    })
  
    return(
        <>
            <h1>Home</h1>
            <PeepForm updatePeepsList={updatePeepsList}/>
            {peepElms}
        
        </>

    )
}