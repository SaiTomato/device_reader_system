import { useState } from "react";
import { usePcListFilterOptions } from "../services/masterService";
import { useNavigate } from "react-router-dom";
import { registerPc } from "../services/pcService";
import type { RegisterPcRequest } from "../types/api/pcRegisterDto";
import SearchSelect from "../components/SearchSelect";
import { useAuth } from "../hooks/useAuth"
import { showError } from "../utils/error";
import { PrimaryButton, SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";
import FormInput from "../components/common/FormInput";
import { validateIpAddress } from "../utils/validators";

const fieldValidators: Partial<Record<keyof RegisterPcRequest, (v: string) => string | undefined>> = {
  pcIpAddress: validateIpAddress,
  // 今後validateがあるinputもここに追加する
};

function PcRegisterPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState<RegisterPcRequest>({
    pcNumber: "",
    pcName: "",
    employeeCurrent: "",
    pcStatus: "",
    pcCategory: "",
    pcUsage: "",
    pcDivision: "",
    pcLocation: "",
    pcMaker: "",
    pcModel: "",
    pcCpu: "",
    pcRam: "",
    pcBuyDate: "",
    pcOs: "",
    pcOsLicense: "",
    pcBackupDate: "",
    pcPassword: "",
    pcOfficeLicense: "",
    pcIpAddress: "",
    updatedBy: user?.email ?? ""
  });

  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const { data: options } = usePcListFilterOptions();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const REQUIRED_FIELDS: (keyof RegisterPcRequest)[] = [
    "pcNumber", "pcName", "pcStatus", "pcCategory", "pcUsage", "pcDivision"
  ];

  const handleRegister = async () => {
    const hasEmpty = REQUIRED_FIELDS.some(
      (key) => !form[key] || String(form[key]).trim() === ""
    );
    if (hasEmpty) {
      showError(new Error("必須項目を入力してください。"));
      return;
    }

    // submit前に一回、格式をチェック
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(fieldValidators) as (keyof RegisterPcRequest)[]) {
      const validator = fieldValidators[key];
      const message = validator?.(form[key] as string);
      if (message) newErrors[key] = message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showError(new Error("入力内容に誤りがあります。"));
      return;
    }

    setErrors({});

    try {

      setIsSubmitting(true);
      const result = await registerPc(form);

      if(result.registered){
        navigate(
          `/qr-code/${result.pcNumber}`
        );
      }
    } catch (error) {
      showError(error);
    }finally{
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    const hasConfirmed = window.confirm("PC新規登録を中止しますか？");
    if (hasConfirmed) {
      navigate(`/pc-list`);
    }
  };

  return (
    <>
      <PageHeader title="PC新規登録"/>

      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200 mb-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          <FormInput
            label="PC番号"
            required
            type="text"
            format="halfWidthNumber"
            value={form.pcNumber}
            onChange={(e) => setForm({...form, pcNumber: e.target.value})}
          />

          <FormInput
            label="PC名"
            required
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
            required
            value={form.pcStatus}
            options={
              options?.pcStatus || []
            }
            placeholder="PC状況"
            onChange={(value) => {
              setForm({
                ...form,
                pcStatus: value
              });
            }}
          />

          <SearchSelect
            label="PC分類"
            required
            value={form.pcCategory}
            options={
              options?.pcCategory || []
            }
            placeholder="PC分類"
            onChange={(value) => {
              setForm({
                ...form,
                pcCategory: value
              });
            }}
          />

          <SearchSelect
            label="PC用途"
            required
            value={form.pcUsage}
            options={
              options?.pcUsage || []
            }
            placeholder="PC用途"
            onChange={(value) => {
              setForm({
                ...form,
                pcUsage: value
              });
            }}
          />

          <SearchSelect
            label="PC区分"
            required
            value={form.pcDivision}
            options={
              options?.pcDivision || []
            }
            placeholder="PC区分"
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
            placeholder="PC場所"
            onChange={(value) => {
              setForm({
                ...form,
                pcLocation: value
              });
            }}
          />

          <FormInput
            label="PCメーカー"
            type="text"
            format="cjkAlphaNum"
            value={form.pcMaker}
            onChange={(e) => setForm({...form, pcMaker: e.target.value})}
          />

          <FormInput
            label="PCモデル"
            type="text"
            value={form.pcModel}
            onChange={(e) => setForm({...form, pcModel: e.target.value})}
          />

          <FormInput
            label="CPU"
            type="text"
            value={form.pcCpu}
            onChange={(e) => setForm({...form, pcCpu: e.target.value})}
          />

          <FormInput
            label="RAM"
            type="text"
            value={form.pcRam}
            onChange={(e) => setForm({...form, pcRam: e.target.value})}
          />

          <FormInput
            label="PC購入日"
            type="date" 
            value={form.pcBuyDate}
            onChange={(e) => setForm({...form, pcBuyDate: e.target.value})}
          />

          <FormInput
            label="PC OS"
            type="text" 
            value={form.pcOs}
            onChange={(e) => setForm({...form, pcOs: e.target.value})}
          />

          <FormInput
            label="PC OSライセンス"
            type="text"
            format="halfWidthAlphaNumSymbol"
            value={form.pcOsLicense}
            onChange={(e) => setForm({...form, pcOsLicense: e.target.value})}
          />

          <FormInput
            label="バックアップイメージ作成日"
            type="date" 
            value={form.pcBackupDate}
            onChange={(e) => setForm({...form, pcBackupDate: e.target.value})}
          />

          <FormInput
            label="PCパスワード"
            type="text" 
            value={form.pcPassword}
            onChange={(e) => setForm({...form, pcPassword: e.target.value})}
          />

          <FormInput
            label="PC Officeライセンス"
            type="text"
            format="halfWidthAlphaNumSymbol"
            value={form.pcOfficeLicense}
            onChange={(e) => setForm({...form, pcOfficeLicense: e.target.value})}
          />

          <FormInput
            label="PC IPアドレス"
            type="text" 
            value={form.pcIpAddress}
            onChange={(e) => setForm({...form, pcIpAddress: e.target.value})}
            validate={validateIpAddress}
            error={errors.pcIpAddress}
          />
        </div>

      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
        <PrimaryButton 
          disabled={isSubmitting} 
          onClick={handleRegister}
          className="sm:flex-1"
        >
          { isSubmitting ? "登録中..." : "登録" }
        </PrimaryButton>

        <SecondaryButton 
          disabled={isSubmitting} 
          onClick={handleBack}
          className="sm:flex-1"
        >
          戻る
        </SecondaryButton>
      </div>
    </>
  );
}

export default PcRegisterPage;
