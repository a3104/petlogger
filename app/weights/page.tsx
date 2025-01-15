import PetSelector from "./petSelector";
import { Pet } from "../models/pet";
import { FaCog, FaWeight, FaPaw } from "react-icons/fa";
import Link from "next/link";
import React from "react";

export default function Home() {
    return (
        <div>
            <div>
                <h1>ペットログ</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href="/weights" passHref>
                    <i><FaWeight size="5em" /></i>
                    <span>体重記録</span>
                    </Link>
                    <Link href="/register" passHref>
                        <i><FaPaw size="5em" /></i>
                        <span>ペット登録</span>
                    </Link>
                    <i><FaCog size="5em" /></i>
                </div>
                <div style={{ marginTop: '30px' }}></div>

                <PetSelector />
            </div>
        </div>
    );
}

