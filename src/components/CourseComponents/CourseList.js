import React, {useEffect} from 'react';
import style from './courseList.module.scss';
import {useState} from "react";
import arrow from '../../img/arrows.svg'

const CourseList = (props)=> {
    let [valueFirst, setValueFirst] = useState('');
    let [valueLast, setValueLast] = useState('');
    let [editMode, setEditMode] = useState(false);

    useEffect(() => {
        props.getCourse()
    }, []);

    let newCourseUSD = () => {
       let courses = props.course;
       let found = courses.find(e => e.txt === 'Долар США');
       return found
    }

    let newCourseEUR = () => {
        let courses = props.course;
        let found = courses.find(e => e.txt === 'Євро');
        return found
    }

    let firstSelectValue = React.createRef();
    let lastSelectValue = React.createRef();

    let normLogic = () => {
        return setEditMode(false);
    }

    let reverseLogic = () => {
       return setEditMode(true);
    }

    const changeInputFirst = (e) => {
        let changingValue = e.currentTarget.value * (lastSelectValue.current.value / firstSelectValue.current.value);
        setValueLast(valueLast = e.currentTarget.value)
        setValueFirst(valueFirst = changingValue.toFixed(2))
    }

    const changeInputLast = (e) => {
        let changingValue = e.currentTarget.value * (firstSelectValue.current.value / lastSelectValue.current.value);
        setValueFirst(valueFirst = e.currentTarget.value)
        setValueLast(valueLast = changingValue.toFixed(2))
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

    return (
      <header className={style.header}>
          <div className={style.container}>
              <div className={style.header__content}>
                  <div className={style.header__content_logo}>
                      <a href="#"><span>currency</span>Exchanger</a>
                  </div>
                  <div className={style.exchanger}>
                      <div className={style.exchanger__inputWrapper}>
                          <input onFocus={normLogic} placeholder='0' onChange={changeInputLast} value={valueFirst}  type="number"/>
                          <select onChange={changeSelectFirst} ref={firstSelectValue}>
                              <option value={newCourseUSD().rate}>{newCourseUSD().txt}</option>
                              <option value={newCourseEUR().rate}>{newCourseEUR().txt}</option>
                              <option value={1}>Гривня</option>
                          </select>
                      </div>
                      <img className={style.exchanger__arrow} src={arrow} alt="arrow"/>
                      <div className={style.exchanger__inputWrapper}>
                          <input onFocus={reverseLogic} placeholder='0' onChange={changeInputFirst} type="number" value={valueLast}/>
                          <select onChange={changeSelectLast} ref={lastSelectValue}>
                              <option value={1}>Гривня</option>
                              <option value={newCourseUSD().rate}>{newCourseUSD().txt}</option>
                              <option value={newCourseEUR().rate}>{newCourseEUR().txt}</option>
                          </select>
                      </div>
                  </div>
              </div>
          </div>
      </header>
    )
}

export default CourseList;