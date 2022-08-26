import React from 'react';
import style from './courseList.module.scss';
import {useState} from "react";

const CourseList = (props)=> {
    let [valueFirst, setValueFirst] = useState('');
    let [valueLast, setValueLast] = useState('');
    let [editMode, setEditMode] = useState(false);

    let firstSelectValue = React.createRef();
    let lastSelectValue = React.createRef();

    let normLogic = () => {
        return setEditMode(false);
    }

    let reverseLogic = () => {
       return setEditMode(true);
    }

    const changeInputFirst = (e) => {
        let changingValue = e.currentTarget.value * (lastSelectValue.current.value / firstSelectValue.current.value );
        setValueLast(valueLast = e.currentTarget.value)
        setValueFirst(valueFirst = changingValue)
    }

    const changeInputLast = (e) => {
        let changingValue = e.currentTarget.value * (firstSelectValue.current.value / lastSelectValue.current.value);
        setValueFirst(valueFirst = e.currentTarget.value)
        setValueLast(valueLast = changingValue)
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
      <section className={style.courseContainer}>
          <div>
              <input onFocus={normLogic} placeholder='0' onChange={changeInputLast} value={valueFirst}  type="number"/>
              <select onChange={changeSelectFirst} ref={firstSelectValue}>
                  <option value={props.courseUSD}>USD</option>
                  <option value={props.courseEUR}>EUR</option>
                  <option value={1}>UAH</option>
              </select>
          </div>
          <div>
              <input onFocus={reverseLogic} placeholder='0' onChange={changeInputFirst} type="number" value={valueLast}/>
              <select onChange={changeSelectLast} ref={lastSelectValue}>
                  <option value={1}>UAH</option>
                  <option value={props.courseUSD}>USD</option>
                  <option value={props.courseEUR}>EUR</option>
              </select>
          </div>
      </section>
    )
}

export default CourseList;