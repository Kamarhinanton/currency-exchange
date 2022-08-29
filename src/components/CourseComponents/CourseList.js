import React, {useEffect} from 'react';
import style from './courseList.module.scss';
import {useState} from "react";
import arrow from '../../img/arrows.svg'

const CourseList = (props)=> {
    let [valueFirst, setValueFirst] = useState('');
    let [valueLast, setValueLast] = useState('');
    let [editMode, setEditMode] = useState(false);

    let firstSelectValue = React.createRef();
    let lastSelectValue = React.createRef();
    let firstInputValue = React.createRef();
    let lastInputValue = React.createRef();

    let USD = 'Долар США'
    let EUR = 'Євро'

    useEffect(() => {
        props.getCourse()
    }, []);

    let newCourse = (string) => {
       let courses = props.course;
       let found = courses.find(e => e.txt === `${string}`);
       return found
    }

    let changeSide = () => {
        let a = firstSelectValue.current.value;
        let b = lastSelectValue.current.value;
        firstSelectValue.current.value = b;
        lastSelectValue.current.value = a;
        if (editMode === false){
            setEditMode(false)
            changeInputLast(firstInputValue.current.value)
        }
        else if(editMode === true){
            setEditMode(true)
            changeInputFirst(lastInputValue.current.value)
        }
    }

    const changeSelectFirst = (e) => {
        if(editMode===false){
            let changingValue = valueFirst * (e.currentTarget.value / lastSelectValue.current.value);
            setValueLast(valueLast = changingValue.toFixed(2))
        }
        else{
            let changingValue = valueLast * (lastSelectValue.current.value / e.currentTarget.value );
            setValueFirst(valueFirst = changingValue.toFixed(2))
        }
    }

    const changeSelectLast = (e) => {
        if(editMode===true){
            let changingValue = valueLast * (e.currentTarget.value / firstSelectValue.current.value);
            setValueFirst(valueLast = changingValue.toFixed(2))
        }
        else{
            let changingValue = valueFirst * (firstSelectValue.current.value / e.currentTarget.value);
            setValueLast(valueLast = changingValue.toFixed(2))
        }
    }

    const changeInputFirst = (value) => {
        let changingValue = value * (lastSelectValue.current.value / firstSelectValue.current.value);
        setValueLast(valueLast = value)
        setValueFirst(valueFirst = changingValue.toFixed(2))
    }

    const changeInputLast = (value) => {
        let changingValue = value * (firstSelectValue.current.value / lastSelectValue.current.value);
        setValueFirst(valueFirst = value)
        setValueLast(valueLast = changingValue.toFixed(2))
    }

    return (
      <header className={style.header}>
          <div className={style.container}>
              <div className={style.header__content}>
                  <div className={style.header__content_logo}>
                      <a href="#"><span>currency</span>Exchanger</a>
                  </div>
                  <div className={style.exchanger}>
                      <div className={style.exchanger__inputWrapper}>
                          <input ref={firstInputValue} onFocus={() => {setEditMode(false)}} placeholder='0' onChange={(e) => {changeInputLast(e.currentTarget.value)}} value={valueFirst}  type="number"/>
                          <select onChange={changeSelectFirst} ref={firstSelectValue}>
                              <option value={newCourse(USD).rate}>{newCourse(USD).txt}</option>
                              <option value={newCourse(EUR).rate}>{newCourse(EUR).txt}</option>
                              <option value={1}>Гривня</option>
                          </select>
                      </div>
                      <img onClick={changeSide} className={style.exchanger__arrow} src={arrow} alt="arrow"/>
                      <div className={style.exchanger__inputWrapper}>
                          <input ref={lastInputValue} onFocus={() => {setEditMode(true)}} placeholder='0' onChange={(e) => {changeInputFirst(e.currentTarget.value)}} value={valueLast} type="number" />
                          <select onChange={changeSelectLast} ref={lastSelectValue}>
                              <option value={1}>Гривня</option>
                              <option value={newCourse(USD).rate}>{newCourse(USD).txt}</option>
                              <option value={newCourse(EUR).rate}>{newCourse(EUR).txt}</option>
                          </select>
                      </div>
                  </div>
              </div>
          </div>
      </header>
    )
}

export default CourseList;