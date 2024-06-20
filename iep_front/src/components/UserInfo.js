import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './UserInfo.css';
import {Box, Skeleton, SkeletonText, SkeletonCircle, Flex} from '@chakra-ui/react';

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const circleRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://team3-webapp-eps.azurewebsites.net/api/users/444D6FB7-FAE7-4472-8B2C-B34135634633');
                const userData = response.data;
                setUser({
                    name: userData.username,
                    currentExp: userData.successfulSubmissions,
                    expToLevelUp: userData.totalSubmissions,
                    coins: 50, // Mock data, update as needed
                    achievements: ['Beginner', 'Intermediate'], // Mock data, update as needed
                    successfulSubmissions: userData.successfulSubmissions,
                    totalSubmissions: userData.totalSubmissions,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (user) {
            const circle = circleRef.current;
            if (circle) {
                circle.style.transition = 'none';
                circle.style.strokeDasharray = `0, 100`;
                setTimeout(() => {
                    circle.style.transition = 'stroke-dasharray 1s ease-out';
                    circle.style.strokeDasharray = `${(user.currentExp / user.expToLevelUp) * 100}, 100`;
                }, 50);
            }
        }
    }, [user]);

    if (!user) {
        return (
            <Box className="user-info" padding="20px" borderRadius="8px" boxShadow="0 0 10px rgba(0, 0, 0, 0.1)" marginBottom="20px">
                <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="5" />
                <Flex justifyContent="center" alignItems="center" marginTop="20px">
                    <SkeletonCircle size="100px" />
                </Flex>
                <Skeleton height="20px" mt="20px" />
                <Skeleton height="20px" mt="20px" />
                <Skeleton height="20px" mt="20px" />
            </Box>
        );
    }

    return (
        <div className="user-info">
            <h2 className="user-name">{user.name}</h2>
            <div className="avatar-container">
                <div className="avatar">
                    <div className="avatar-front">
                        <img src="https://res.cloudinary.com/hht4avzbk/image/upload/v1701210542/vorklbgouiqa8noijh0f.png" alt="Avatar" className="avatar-image" />
                    </div>
                    <div className="avatar-back">
                        <p className="level">Level 10</p> {/* Mock level, you can use user.level */}
                    </div>
                </div>
                <div className="experience-circle">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg"
                              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path ref={circleRef} className="circle"
                              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                </div>
            </div>
            <div className="experience">
                <p>Experience: {user.currentExp} / {user.expToLevelUp}</p>
            </div>
            <div className="submissions">
                <p>Successful Submissions: {user.successfulSubmissions}</p>
                <p>Total Submissions: {user.totalSubmissions}</p>
            </div>
            <div className="coins">
                <img src="https://res.cloudinary.com/hht4avzbk/image/upload/v1718185704/zaxxhuyaslbdwvrlcx98.png" alt="Coin" className="coin-icon" />
                <p>{user.coins}</p>
            </div>
            <h3>Achievements:</h3>
            <ul>
                {user.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserInfo;
