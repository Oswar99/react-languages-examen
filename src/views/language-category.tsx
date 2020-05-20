import React,{useState, useEffect} from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Subheader from "../components/subheader";
import Card from "../components/card";

import {ILanguage} from "../interfaces/language";
import {ICategory} from "../interfaces/category";


import {getLanguageByCategory, getCategory} from "../services/categories";
import { useParams } from "react-router-dom";

const LanguageCategory: React.FC = () => { 

    const [languagesCategory,setLanguagesCategory] = useState([]);
    const [category, setCategory] = useState([]);

    const {id} = useParams();
    
    useEffect(()=>{
        if(id){
            getLanguageByCategory(id).then( r=>{                
                setLanguagesCategory(r.data);
            });
            getCategory(id).then( l=>{
                setCategory(l.data);
            });
        }      
    },[id]);


    useEffect(() => {
        return () => {
          console.log("cleaned up");
        };
      }, []);

    return(
        <div>
            <Header></Header>
    
            <div className="container">
                {category.map((cat: ICategory)=>(
                    <Subheader title= {cat.name} ></Subheader>
                ))};
                {languagesCategory.map((lan: ILanguage,index) => (
                    <div className="row text-center">
                        <Card 
                        title={lan.name} 
                        description={lan.description} 
                        key={lan._id} 
                        category={lan.category[0].name}
                        LanguageId={lan._id}
                        />
                    </div>
                ))}
            </div>
            <Footer></Footer>
        </div>
    );

}

export default LanguageCategory;