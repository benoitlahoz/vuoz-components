import { Component, Vue } from 'vue-property-decorator';

@Component
export class VuozTimeFormatterMixin extends Vue {

  public parseDays(date: Date) {
    
    // Year
    let result = date.getFullYear().toString();
    // Month
    result += `/${this.formatToTen(date.getMonth() + 1)}`;
    // Day of the month
    result += `/${this.formatToTen(date.getDate())}`;

    return result

  }

  public parseTime(date: Date) {
    
    const result = `` +
    `${this.formatToTen(date.getHours())}:` +
    `${this.formatToTen(date.getMinutes())}:` +
    `${this.formatToTen(date.getSeconds())}:`+
    `${this.formatToHundred(date.getMilliseconds())}`;

    return result;

  }

  public parseFullReadable(date: Date) {

    return `${this.parseDays(date)}-${this.parseTime(date)}`;
    
  }

  public parseMilliseconds(milliseconds: number) {

    //Get hours from milliseconds
    const hours = milliseconds / (1000 * 60 * 60);
    const absoluteHours = Math.floor(hours);
    const h = this.formatToTen(absoluteHours);

    //Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const m = this.formatToTen(absoluteMinutes);

    //Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    const s = this.formatToTen(absoluteSeconds);

    //Get remainder from seconds and convert to milliseconds
    const millis = (seconds - absoluteSeconds) * 1000;
    const absoluteMillis = Math.floor(millis);
    const ms = this.formatToHundred(absoluteMillis)

    return h + ":" + m + ":" + s + ":" + ms;

  }

  public formatToTen(value: number) {
    return value > 9 ? value : "0" + value
  }

  public formatToHundred(value: number) {
    return (value > 99 ? value : (value > 9 ? "0" + value : "00" + value)).toString()
  }

}