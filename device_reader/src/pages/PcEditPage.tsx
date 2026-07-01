import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updatePcInfo, usePcDetail } from '../services/pcService';
import { usePcListFilterOptions } from '../services/masterService';
import SearchSelect from '../components/SearchSelect';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { showError } from '../utils/error';
import { PrimaryButton, SecondaryButton } from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import FormInput from '../components/common/FormInput';
import TextareaInput from '../components/common/TextareaInput';
import { useQueryClient } from '@tanstack/react-query';


function PcEditPage() {
    const { pcNumber } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user } = useAuth();

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
        updatedBy: "",
        previousPcName: ""
    });

    const [ originalPcName, setOriginalPcName ] = useState("");

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

            pcRemark: pcDetail.pcRemark,

            updatedBy: user?.email ?? "", // 追加: 更新者のメールアドレスを設定

            previousPcName: originalPcName
        });

        setOriginalPcName(
            pcDetail.pcName
        );

    }, [pcDetail]);

    const validateRequiredFields = () => {
        const requiredFields = {
            pcName: "PC名",
            employeeCurrent: "現使用者",
            pcStatus: "PC状況",
            pcCategory: "PC分類",
            pcUsage: "PC用途",
            pcDivision: "PC区分",
            pcLocation: "PC場所"
        };

        for (const [field, label] of Object.entries(requiredFields)) {
            if (!form[field as keyof typeof form]?.toString().trim()) {
                showError(new Error(`${label}は必須項目です。`));
                return false;
            }
        }
        return true;
    };

    const handleUpdate = async () => {

        if (!validateRequiredFields()) {
            return;
        }
        
        try {
            setIsSubmitting(true);
            const result = await updatePcInfo(form);

            if (result.pdfData) {
                const link = document.createElement("a");
                link.href = result.pdfData;
                link.download = `貸出証_${form.employeeCurrent}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                queryClient.invalidateQueries({queryKey: ['pcDetail', pcNumber]});
                navigate(`/update-complete/${pcNumber}`);
            }
            else {
                queryClient.invalidateQueries({queryKey: ['pcDetail', pcNumber]});
                navigate(`/update-complete/${pcNumber}`);
            }
        } catch (error) {
            showError(error)
        }finally{
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        const hasConfirmed = window.confirm("入力を破棄しますか？");
        if (hasConfirmed) {
            navigate(`/pc-detail/${pcNumber}`);
        }
    };

    if (isLoading) {
        return (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="mt-3 text-gray-600 font-medium">読込中...</p>
            </div>
          </div>
        );
    }
    if (error) {
        return (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg font-medium">
            読込失敗: {error.message}
          </div>
        );
    }

    return (

        <>
            <PageHeader title="PC編集"/>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 sm:p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">PC番号</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{pcDetail?.pcNumber}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">PC現状況</p>
                  <p className="text-base sm:text-lg font-bold text-blue-700">{pcDetail?.pcStatus}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200 mb-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                
                <FormInput
                    label="PC名"
                    type="text"
                    format="cjkAlphaNum"
                    value={form.pcName}
                    onChange={(e) => setForm({...form, pcName: e.target.value})}
                />

                <SearchSelect
                    label="現使用者"
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
                    label="PC状況"
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
                    label="PC分類"
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
                    label="PC用途"
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
                    label="PC区分"
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
                    label="PC場所"
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

              <div className="mt-6 pt-6 border-t border-gray-200">
                <TextareaInput
                    label="備考"
                    value={form.pcRemark}
                    onChange={(e) => setForm({...form, pcRemark: e.target.value})}
                    rows={4}
                />
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
                <SecondaryButton
                    disabled={isSubmitting}
                    onClick={handleBack}
                    className="sm:flex-1"
                >
                    戻る
                </SecondaryButton>
                <PrimaryButton
                    disabled={isSubmitting}
                    onClick={handleUpdate}
                    className="sm:flex-1"
                >
                    { isSubmitting ? "更新中..." : "更新" }
                </PrimaryButton>
            </div>
        </>
    );
}

export default PcEditPage;
