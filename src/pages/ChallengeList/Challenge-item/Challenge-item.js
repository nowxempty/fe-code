import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import ResetIcon from '../../../components/Icon/reset';
import Downicon from '../../../components/Icon/downicon';
import Upicon from '../../../components/Icon/upicon';
import "./Challenge-item.css";

const Challenge_item = ({ data = [], searchTerm, difficultyFilter }) => {
    const [sortedData, setSortedData] = useState(data);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    useEffect(() => {
        const filteredData = data.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (difficultyFilter === "난이도" || item.difficulty.toLowerCase() === difficultyFilter)
        );
        setSortedData(filteredData);
    }, [data, searchTerm, difficultyFilter]);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedArray = [...sortedData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setSortedData(sortedArray);
        setSortConfig({ key, direction });
    };

    const sortByParticipants = () => {
        let direction = 'ascending';
        if (sortConfig.key === 'currentParticipants' && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedArray = [...sortedData].sort((a, b) => {
            if (a.currentParticipants < b.currentParticipants) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a.currentParticipants > b.currentParticipants) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setSortedData(sortedArray);
        setSortConfig({ key: 'currentParticipants', direction });
    };

    const sortByDifficulty = () => {
        const order = ['bronze', 'silver', 'gold'];
        let direction = 'ascending';
        if (sortConfig.key === 'difficulty' && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedArray = [...sortedData].sort((a, b) => {
            const aIndex = order.indexOf(a.difficulty.toLowerCase());
            const bIndex = order.indexOf(b.difficulty.toLowerCase());
            if (aIndex < bIndex) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (aIndex > bIndex) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setSortedData(sortedArray);
        setSortConfig({ key: 'difficulty', direction });
    };

    const resetSort = () => {
        setSortedData(data);
        setSortConfig({ key: '', direction: '' });
    };

    const renderIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? <Upicon /> : <Downicon />;
        }
        return <Downicon />;
    };

    return (
        <div className='Challenge_item'>
            <div className='Challenge_header'>
                <div onClick={sortByParticipants} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <span>참여 인원</span> <span>{renderIcon('currentParticipants')}</span>
                </div>
                <div onClick={() => sortData('title')} className="title" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <span>제목</span> <span>{renderIcon('title')}</span>
                </div>
                <div onClick={sortByDifficulty} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <span>난이도</span> <span>{renderIcon('difficulty')}</span>
                </div>
                <div onClick={() => sortData('creator')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <span>생성자</span> <span>{renderIcon('creator')}</span>
                </div>
                <div className="reset_button" onClick={resetSort} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ResetIcon /><p style={{ color: "#4679fd", fontSize: '1rem' }}>초기화</p>
                </div>
            </div>
            <div className='Challenge_list'>
                {sortedData.map((item, index) => {
                    const participationRatio = item.currentParticipants / item.totalParticipants;
                    const participationClass =
                        participationRatio === 1 ? 'full' : '';

                    return (
                        <div className='Challenge_list_item' key={index}>
                            <div className={`participants ${participationClass}`}>
                                {`( ${item.currentParticipants} / ${item.totalParticipants} )`}
                            </div>
                            <div className="title">{item.title}</div>
                            <div className={`difficulty ${item.difficulty.toLowerCase()}`}>{item.difficulty}</div>
                            <div className="creator">{item.creator}</div>
                            <div><Button className="participants_button" text="참가" /></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Challenge_item;
