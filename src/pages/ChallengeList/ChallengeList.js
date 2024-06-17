import React, { useState } from 'react';
import Challenge_header from './Challenge_header/Challenge_header'
import Challenge_item from './Challenge-item/Challenge-item'
import "./ChallengeList.css"

const Challenge_chart = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('난이도');

    const exampleData = [
        { currentParticipants: 2, totalParticipants: 8, title: "알고리즘", difficulty: "Silver", creator: "살9싶어" },
        { currentParticipants: 6, totalParticipants: 8, title: "히노카미 카구라", difficulty: "Gold", creator: "9해줘" },
        { currentParticipants: 3, totalParticipants: 8, title: "헤키레키 잇센 7연", difficulty: "Bronze", creator: "탄지로" },
        { currentParticipants: 7, totalParticipants: 8, title: "호흡법", difficulty: "Bronze", creator: "미츠리" },
        { currentParticipants: 8, totalParticipants: 8, title: "문제풀이", difficulty: "Silver", creator: "토키토" },
        { currentParticipants: 2, totalParticipants: 8, title: "흑섬", difficulty: "Gold", creator: "나나밍" },
        { currentParticipants: 1, totalParticipants: 8, title: "도산", difficulty: "Silver", creator: "안창호" },
        { currentParticipants: 2, totalParticipants: 8, title: "알고리즘", difficulty: "Silver", creator: "살9싶어" },
        { currentParticipants: 5, totalParticipants: 8, title: "히노카미 카구라", difficulty: "Gold", creator: "9해줘" },
        { currentParticipants: 3, totalParticipants: 8, title: "헤키레키 잇센 7연", difficulty: "Bronze", creator: "탄지로" },
        { currentParticipants: 7, totalParticipants: 8, title: "호흡법", difficulty: "Bronze", creator: "미츠리" },
        { currentParticipants: 8, totalParticipants: 8, title: "문제풀이", difficulty: "Silver", creator: "토키토" },
        { currentParticipants: 4, totalParticipants: 8, title: "흑섬", difficulty: "Gold", creator: "나나밍" },
        { currentParticipants: 1, totalParticipants: 8, title: "도산", difficulty: "Silver", creator: "안창호" }
    ];

    const handleDifficultyChange = (difficulty) => {
        setDifficultyFilter(difficulty === difficultyFilter ? '난이도' : difficulty);
    };

    return (
        <div className='Challenge_chart'>
            <Challenge_header onSearch={setSearchTerm} onDifficultyChange={handleDifficultyChange} />
            <Challenge_item data={exampleData} searchTerm={searchTerm} difficultyFilter={difficultyFilter} />
        </div>
    );
};

export default Challenge_chart;
