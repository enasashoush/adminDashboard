import React, { useContext } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import Card from './Card'
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './authContext';
import { Helmet } from 'react-helmet';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

function Dashboard() {

    const { token } = useContext(AuthContext)
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            {token ? <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">HealthGuard Dashboard</h1>
                    <a href="/" className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm">
                        <FontAwesomeIcon icon={faDownload} style={{ marginRight: "0.25rem", color: "white" }} />
                        Generate Report
                    </a>
                </div>
                <div className="row">
                    <Card title="Earnings(Monthly)" value="$40,000" color="primary" />
                    <Card title="Earnings(Annual)" value="$215,000" color="success" />
                    <Card title="Tasks" value="50%" color="info" />
                    <Card title="Pending Requests" value="18" color="warning" />
                </div>
                <div className='row'>
                    <div className='col-xl-4 col-lg-5'>
                        <Doughnut
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Revenue Sources'
                                    }
                                }
                            }}
                            data={{
                                labels: [
                                    'Direct',
                                    'Referral',
                                    'Social'
                                ],
                                datasets: [{
                                    data: [55, 30, 15],
                                    backgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(54, 162, 235)',
                                        'lightgreen'
                                    ],
                                    hoverOffset: 4
                                }]
                            }}
                        />
                    </div>
                    <div className='col-xl-8 col-lg-7'>
                        <Line options={{
                            responsive: true,
                            plugins: {
                                legend:
                                {
                                    position: 'top',
                                },
                                title:
                                {
                                    display: true,
                                    text: 'Earnings Overview',
                                },
                            },
                        }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [{
                                    label: 'Earnings in $',
                                    data: [0, 10000, 5000, 15000, 13000, 22000, 33000],
                                    fill: false,
                                    borderColor: 'rgb(75, 192, 192)',
                                    tension: 0.1
                                }]
                            }}
                        />;
                    </div>
                </div></> : <></>}
        </>
    )
}

export default Dashboard