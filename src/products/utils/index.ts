 class Utils {
    public static async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static async isRequiredProps(props: any) {
        if (!props) {
            throw new Error('props is required');
        }
    }

    public static async toDate(date: any) {
        return new Date(date);
    }
}

export default Utils