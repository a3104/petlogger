import Link from "next/link";
import PetList from "./petlist";
import { FaCog, FaPaw, FaWeight, FaHospital, FaSyringe } from "react-icons/fa";
import AddVaccination from "../vaccinations/addVaccination";

import { Vaccination } from '../models/vaccination';
import React from "react";

export default function Home() {

    return (
        <div>
            <div>
                <h1>ペットログ</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href="/weights" passHref>
                        <div style={{ textAlign: 'center' }}>

                            <i><FaWeight size="5em" /></i>
                            <span>体重記録</span>
                        </div>
                    </Link>
                    <Link href="/weights" passHref>
                        <i><FaWeight size="5em" /></i>
                        <span>体重記録</span>
                    </Link>

                    <Link href="/register" passHref>
                        <i><FaPaw size="5em" /></i>
                        <span>ペット登録</span>
                    </Link>
                    <Link href="/hospital" passHref>
                        <div style={{ textAlign: 'center' }}>
                            <i><FaHospital size="5em" /></i>
                            <span>通院履歴</span>
                        </div>
                    </Link>
                    <Link href="/vaccination" passHref>
                        <i><FaSyringe size="5em" /></i>
                        <span>予防接種</span>
                    </Link>
                    <Link href="/setting" passHref>
                        <i><FaCog size="5em" /></i>
                        <div style={{ textAlign: 'center' }}>
                            <span>設定</span>
                        </div>
                    </Link>
                </div>
                <div style={{ marginTop: '20px' }}></div>
                <PetList />
                <AddVaccination  />
            </div>
        </div>
    );
}
