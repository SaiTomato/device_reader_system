import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updatePcInfo, usePcDetail } from '../services/pcService';
import { usePcListFilterOptions } from '../services/masterService';
import SearchSelect from '../components/SearchSelect';
import { useNavigate } from "react-router-dom";
import { CURRENT_USER } from "../constants/auth";
import { showError } from '../utils/error';
import { PrimaryButton, SecondaryButton } from '../components/common/Button';


function PcEditPage() {
    const { pcNumber } = useParams();
    const navigate = useNavigate();

    const { data: pcDetail, isLoading, error } = usePcDetail(pcNumber || "");

    const {data: options} = usePcListFilterOptions();

    const [form, setForm] = useState({
        pcNumber: pcNumber || "",
        pcName: "",
        employeeCurrent: "",
        pcStatus: "",
        pcCategory: "",
        pcUsage: "",
        pcDivision: "",
        pcLocation: "",
        pcRemark: "",
        updatedBy: ""
    });

    const [originalPcName, setOriginalPcName] = useState("");

    const [ isSubmitting, setIsSubmitting ] = useState(false);

    useEffect(() => {

        if(!pcDetail) return;

        setForm({

            pcNumber: pcDetail.pcNumber,

            pcName: pcDetail.pcName,

            employeeCurrent: pcDetail.employeeCurrent,

            pcStatus: pcDetail.pcStatus,

            pcCategory: pcDetail.pcCategory,

            pcUsage: pcDetail.pcUsage,

            pcDivision: pcDetail.pcDivision,

            pcLocation: pcDetail.pcLocation,

            pcRemark: "", // pcDetailに備考がないため、初期値は空文字

            updatedBy: CURRENT_USER.email // 追加: 更新者のメールアドレスを設定

        });

        setOriginalPcName(
            pcDetail.pcName
        );
    }, [pcDetail]);

    const handleUpdate = async () => {

        if(form.pcCategory.includes("貸出")){
            navigate(`/loan-document/${pcNumber}`,
                {
                    state: {
                        updateData: form,
                        originalPcName
                    }
                }
            );
            return;
        }
        try {
            setIsSubmitting(true);
            const result = await updatePcInfo(form);

            if(result.updated){
                navigate("/update-complete");
            }
            
        } catch (error) {
            showError(error)
        }finally{
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Loading failed: {error.message}</div>;
    }

    return (

        <>
            <h1>
                PC編集
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
                <label>
                    PC名:
                </label>
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

                <label>
                    社員名:
                </label>
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

                <label>
                    状況:
                </label>
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

                <label>
                    分類:
                </label>
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

                <label>
                    用途:
                </label>
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

                <label>
                    区分:
                </label>
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

                <label>
                    場所:
                </label>
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

                <label>
                    備考:
                </label>
                <textarea
                    value={form.pcRemark}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            pcRemark:
                            e.target.value
                        })
                    }
                    rows={4}
                />
            </div>

            <div>
                <SecondaryButton
                    disabled={isSubmitting}
                    onClick={() => { navigate(`/pc-detail/${pcDetail?.pcNumber}`) }}
                >
                    戻る
                </SecondaryButton>
                <PrimaryButton
                    disabled={isSubmitting}
                    onClick={handleUpdate}
                >
                    { isSubmitting ? "更新中..." : "更新" }
                </PrimaryButton>
            </div>
        </>
    );
}

export default PcEditPage;
