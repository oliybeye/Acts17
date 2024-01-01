package utils

import "time"

func GetCurrentDateTime() string {
	currentTime := time.Now()
	return FormatDateTime(currentTime)
}

var dateTimeFormatStr = "2006-1-2 15:4:5"

func FormatDateTime(time time.Time) string {
	return time.Format(dateTimeFormatStr)
}

var dateFormatStr = "2006-1-2"

func FormatDate(time time.Time) string {
	return time.Format(dateFormatStr)
}

func GetCurrentDate() string {
	currentTime := time.Now()
	return FormatDate(currentTime)
}
