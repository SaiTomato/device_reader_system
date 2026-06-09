import { useState } from "react";
import { usePcListFilterOptions } from "../services/masterService";
import { useNavigate } from "react-router-dom";
import { registerPc } from "../services/pcService";
import type { RegisterPcRequest } from "../types/api/pcRegisterDto";
import SearchSelect from "../components/SearchSelect";
import { CURRENT_USER } from "../constants/auth";
import { showError } from "../utils/error";
import { PrimaryButton, SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

function PcRegisterPage() {
  const navigate = useNavigate();
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
    // pcBackupDate: "",
    pcPassword: "",
    pcOfficeLicense: "",
    pcIpAddress: "",
    updatedBy: CURRENT_USER.email
  });

  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const { data: options } = usePcListFilterOptions();

  const handleRegister = async () => {
    const values = Object.values(form);
    const hasEmpty =values.some(value => !value.trim());
    if (hasEmpty) {
      alert("全項目を入力してください");
      return;
    }
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

  return (
    <>
      <PageHeader title="PC新規登録"/>

      <div>
        <label>PC番号:</label>
        <input 
          type="text" 
          value={form.pcNumber} 
          onChange={(e) => setForm({...form, pcNumber: e.target.value})} 
        />

        <label>PC名:</label>
        <input 
          type="text" 
          value={form.pcName} 
          onChange={(e) => setForm({...form, pcName: e.target.value})} 
        />

        <label>現使用者:</label>
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

        <label>PC状況:</label>
        <SearchSelect
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

        <label>PC分類:</label>
        <SearchSelect
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

        <label>PC用途:</label>
        <SearchSelect
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

        <label>PC区分:</label>
        <SearchSelect
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

        <label>PC場所:</label>
        <SearchSelect
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

        <label>PCメーカー:</label>
        <input 
          type="text" 
          value={form.pcMaker} 
          onChange={(e) => setForm({...form, pcMaker: e.target.value})} 
        />

        <label>PCモデル:</label>
        <input 
          type="text" 
          value={form.pcModel} 
          onChange={(e) => setForm({...form, pcModel: e.target.value})} 
        />

        <label>PC CPU:</label>
        <input 
          type="text" 
          value={form.pcCpu} 
          onChange={(e) => setForm({...form, pcCpu: e.target.value})} 
        />

        <label>PC RAM:</label>
        <input 
          type="text" 
          value={form.pcRam} 
          onChange={(e) => setForm({...form, pcRam: e.target.value})} 
        />

        <label>PC購入日:</label>
        <input 
          type="date" 
          value={form.pcBuyDate} 
          onChange={(e) => setForm({...form, pcBuyDate: e.target.value})} 
        />

        <label>PC OS:</label>
        <input 
          type="text" 
          value={form.pcOs} 
          onChange={(e) => setForm({...form, pcOs: e.target.value})} 
        />

        <label>PC OSライセンス:</label>
        <input 
          type="text" 
          value={form.pcOsLicense} 
          onChange={(e) => setForm({...form, pcOsLicense: e.target.value})} 
        />

        {/* <label>PCバックアップ日:</label>
        <input 
          type="date" 
          value={form.pcBackupDate} 
          onChange={(e) => setForm({...form, pcBackupDate: e.target.value})} 
        /> */}

        <label>PCパスワード:</label>
        <input 
          type="text" 
          value={form.pcPassword} 
          onChange={(e) => setForm({...form, pcPassword: e.target.value})} 
        />

        <label>PC Officeライセンス:</label>
        <input 
          type="text" 
          value={form.pcOfficeLicense} 
          onChange={(e) => setForm({...form, pcOfficeLicense: e.target.value})} 
        />

        <label>PC IPアドレス:</label>
        <input 
          type="text" 
          value={form.pcIpAddress} 
          onChange={(e) => setForm({...form, pcIpAddress: e.target.value})} 
        />
      </div>

      <div>
        <PrimaryButton disabled={isSubmitting} onClick={handleRegister}>
          { isSubmitting ? "登録中..." : "登録" }
        </PrimaryButton>

        <SecondaryButton disabled={isSubmitting} onClick={() => navigate("/pc-list")}>
          戻る
        </SecondaryButton>
      </div>
    </>
  );
}

export default PcRegisterPage;
