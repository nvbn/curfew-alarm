type IDateTime = () => Date;

export default IDateTime;

export const DateTimeDefaultImpl: IDateTime = () => new Date();
