import dayjs from "dayjs";
import Duration from 'dayjs/plugin/duration'

dayjs.locale("zh-cn");

dayjs.extend(Duration);

export default dayjs;