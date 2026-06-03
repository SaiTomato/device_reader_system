import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePcDetail } from '../services/pcService';
import { usePcListFilterOptions } from '../services/masterService';
import SearchSelect from '../components/SearchSelect';
import { useNavigate } from "react-router-dom";


function PcEditPage() {
    const { pcNumber } = useParams();
    const navigate = useNavigate();

    const { data: pcDetail, isLoading, error } = usePcDetail(pcNumber || "");

    const {data: options} = usePcListFilterOptions();

    const [form, setForm] = useState({
        pcName: "",
        employeeCurrent: "",
        pcStatus: "",
        pcCategory: "",
        pcUsage: "",
        pcDivision: "",
        pcLocation: ""
    });

    useEffect(() => {

        if(!pcDetail) return;

        setForm({

            pcName:
            pcDetail.pcName,

            employeeCurrent:
            pcDetail.employeeCurrent,

            pcStatus:
            pcDetail.pcStatus,

            pcCategory:
            pcDetail.pcCategory,

            pcUsage:
            pcDetail.pcUsage,

            pcDivision:
            pcDetail.pcDivision,

            pcLocation:
            pcDetail.pcLocation

        });
    }, [pcDetail]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Loading failed: {error.message}</div>;
    }

    return (

        <>
            <h1>
                PC Edit Page
            </h1>

            <div>
                <h2>
                    PC番号:
                    {pcDetail?.pcNumber}
                </h2>

                <h2>
                    現在状況:
                    {pcDetail?.pcStatus}
                </h2>
            </div>

            <div>
                <input
                    value={form.pcName}
                    onChange={(e) =>
                        setForm({
                        ...form,
                        pcName:
                            e.target.value
                        })
                    }
                />

                <SearchSelect
                    value={form.employeeCurrent}
                    options={
                        options?.employeeName || []
                    }
                    placeholder="社員名"
                    onChange={(value) => {
                        setForm({
                        ...form,
                        employeeCurrent: value
                        });
                    }}
                />

                <SearchSelect
                    value={form.pcStatus}
                    options={
                        options?.pcStatus || []
                    }
                    placeholder="状況"
                    onChange={(value) => {
                        setForm({
                            ...form,
                            pcStatus: value
                        });
                    }}
                />

                <SearchSelect
                    value={form.pcCategory}
                    options={
                        options?.pcCategory || []
                    }
                    placeholder="分類"
                    onChange={(value) => {
                        setForm({
                            ...form,
                            pcCategory: value
                        });
                    }}
                />

                <SearchSelect
                    value={form.pcUsage}
                    options={
                        options?.pcUsage || []
                    }
                    placeholder="用途"
                    onChange={(value) => {
                        setForm({
                            ...form,
                            pcUsage: value
                        });
                    }}
                />

                <SearchSelect
                    value={form.pcDivision}
                    options={
                        options?.pcDivision || []
                    }
                    placeholder="区分"
                    onChange={(value) => {
                        setForm({
                            ...form,
                            pcDivision: value
                        });
                    }}
                />

                <SearchSelect
                    value={form.pcLocation}
                    options={
                        options?.pcLocation || []
                    }
                    placeholder="場所"
                    onChange={(value) => {
                        setForm({
                            ...form,
                            pcLocation: value
                        });
                    }}
                />
            </div>

            <div>
                <button
                    onClick={() => { navigate(`/pc-detail/${pcDetail?.pcNumber}`) }}
                >
                    戻る
                </button>
                <button>
                    保存
                </button>
            </div>
        </>
    );
}

export default PcEditPage;
