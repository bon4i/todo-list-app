import styles from './App.module.css';
import React, { useState } from 'react';

export const App = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);
    const [error, setError] = useState('');

    const errorHTML = <div className={styles.error}>{error}</div>;
    const isValueValid = value.length < 3 ? false : true;
    const listParagraph = <p className={['no-margin-text']}>Нет добавленных элементов</p>;

    const onInputButtonClick = () => {
        const promptValue = prompt('Введите новое значение');
        if (promptValue.length < 3) {
            setError('Введенное значение содержит менее 3 символов');
        } else {
            setValue(promptValue);
            setError('');
        }
    };

    const checkTime = (item) => {
        if (item < 10) {
            item = '0' + item;
        }
        return item;
    };

    const formatDate = (date) => {
        let day, month, year, hour, min, sec;

        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        hour = date.getHours();
        min = date.getMinutes();
        sec = date.getSeconds();

        const formattedDate = `${checkTime(day)}.${checkTime(month)}.${year}`;
        const formattedTime = `${checkTime(hour)}:${checkTime(min)}:${checkTime(sec)}`;
        return `${formattedDate} ${formattedTime}`;
    };

    const onAddButtonClick = () => {
        if (isValueValid) {
            setList((prevList) => [
                ...list,
                {
                    id: new Date().getTime(),
                    value: value,
                    createDate: formatDate(new Date()),
                },
            ]);
            setValue('');
            setError('');
        }
    };

    return (
        <div className={styles.app}>
            <h1 className={styles['page-heading']}>Ввод значения</h1>
            <p className={styles['no-margin-text']}>
                Текущее значение <code>value</code>: "
                <output className={styles['current-value']}>{value}</output>"
            </p>
            {error !== '' ? errorHTML : error}
            <div className={styles['buttons-container']}>
                <button className={styles.button} onClick={onInputButtonClick}>
                    Ввести новое
                </button>
                <button
                    className={styles.button}
                    disabled={!isValueValid}
                    onClick={onAddButtonClick}
                >
                    Добавить в список
                </button>
            </div>
            <div className={styles['list-container']}>
                <h2 className={styles['list-heading']}>Список:</h2>
                {list.length === 0 ? listParagraph : ''}
                <ul className={styles.list}>
                    {list.map(({ id, value, createDate }) => (
                        <li key={id}>
                            {value} {createDate}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
