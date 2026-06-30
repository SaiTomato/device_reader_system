export const validateIpAddress = (value: string): string | undefined => {
    if (!value) return undefined;
    const match = value.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (!match) return "正しいIPアドレス形式で入力してください";
    if (match.slice(1, 5).some((seg) => Number(seg) > 255)) {
    return "各セグメントは0〜255の範囲で入力してください";
    }
    return undefined;
};