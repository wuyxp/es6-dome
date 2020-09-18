const time = [
    {
        ruleType: "2",
        day: "monday",
        start: "5:00",
        end: "14:00",
        id: "0.s44ml7pk75o",
    },
    {
        ruleType: "2",
        day: "tuesday",
        start: "10:00",
        end: "10:00",
        id: "0.pjljskgvtmo",
    },
    {
        ruleType: "1",
        day: "tuesday",
        start: "1:30",
        end: "7:00",
        id: "0.389sorv33j",
    },
    {
        ruleType: "2",
        day: "tuesday",
        start: "5:30",
        end: "15:00",
        id: "0.10qcjfcok7o",
    },
    {
        ruleType: "0",
        day: "tuesday",
        start: "11:00",
        end: "17:30",
        id: "0.rcibn4g7dqg",
    },
    {
        ruleType: "eraser30",
        day: "tuesday",
        start: "6:00",
        end: "12:00",
        id: "0.bhagu7ka548",
    },
    {
        ruleType: "0",
        day: "wednesday",
        start: "0:00",
        end: "22:00",
        id: "0.9kqipqiigh"
    },
    {
        ruleType: "2",
        day: "thursday",
        start: "6:00",
        end: "24:00",
        id: "0.dqpgh3suj88"
    },
    {
        ruleType: "1",
        day: "tuesday",
        start: "9:30",
        end: "16:00",
        id: "0.ch4nrhjh2n"
    },
    {
        ruleType: "1",
        day: "friday",
        start: "3:30",
        end: "6:30",
        id: "0.9smr9man0b"
    },
    {
        ruleType: "0",
        day: "friday",
        start: "4:30",
        end: "12:30",
        id: "0.ar479rldm3"
    },
    {
        ruleType: "2",
        day: "friday",
        start: "9:30",
        end: "16:00",
        id: "0.lblaupguotg"
    },
    {
        ruleType: "eraser1440",
        day: "friday",
        start: "00:00",
        end: "24:00",
        id: "0.a6leemoggn8"
    },
    {
        ruleType: "2",
        day: "friday",
        start: "1:00",
        end: "5:00",
        id: "0.pbq2kor87v8"
    },
    {
        ruleType: "1",
        day: "friday",
        start: "7:00",
        end: "10:00",
        id: "0.bos732mds98"
    }
]

// transform 1:00 => 1, 04:30 => 4.5 
const timeToNumber = time => {
    const [s1, s2] = time.split(":")
    return parseInt(s1) + (parseInt(s2) / 60)
}
// transform 1 => 1:00, 4.5 => 04:30
const numberToTime = num => {
    return ('00' + Math.floor(num)).slice(-2) + ':' + ('00' + num % 1 * 60).slice(-2)
}

// 判断time1 是否包含 time2
const includeTime = (time1, time2) => {
    const { start: time1Start, end: time1End  } = time1
    const { start: time2Start, end: time2End  } = time2
    const s1 = timeToNumber(time1Start)
    const e1 = timeToNumber(time1End)
    const s2 = timeToNumber(time2Start)
    const e2 = timeToNumber(time2End)
    return (s1 <= s2 && e1 >= e2)
}

// 将连续的时间，拆分成30分钟一段的时间
const aplitArray = (arr, item) => {
    const times = Array(48).fill().map((i, index) => {
        return {
            ruleType: undefined,
            day: item.day,
            id: Math.random().toString(32),
            start: numberToTime(index * 0.5),
            end: numberToTime(index * 0.5 + 0.5),
        }
    })
    
    return times.map(time => {
        arr.forEach(currentTime => {
            if(includeTime(currentTime, time)) {
                time.ruleType = currentTime.ruleType
                time.day = currentTime.day
            }
        })
        if(includeTime(item, time)) {
            time.ruleType = item.ruleType
            time.day = item.day
        }
        return time
    })
}

// 将拆分成30分钟一段的时间，合并成时间段
const joinArray = (arr) => {
    const filterArr = arr.filter(item => item.ruleType && (item.ruleType !== 'eraser30' && item.ruleType !== 'eraser60'))
    const newArr = [[filterArr.shift()]]
    while(filterArr && filterArr.length > 0) {
        const firstFilter = filterArr.shift()
        const lastOneArr = newArr[newArr.length - 1]
        const lastLast = lastOneArr[lastOneArr.length-1]
        // 如果类型相等，并且这个起始时间等于最后的终止时间那么推到一个数组里
        if((lastLast.ruleType === firstFilter.ruleType) && (lastLast.end === firstFilter.start)) {
            lastOneArr.push(firstFilter)
        } else {
            newArr.push([firstFilter])
        }
    }
    return newArr.map(newArrItem => {
        return {
            ruleType: newArrItem[0].ruleType,
            day: newArrItem[0].day,
            start: newArrItem[0].start,
            end: newArrItem[newArrItem.length-1].end,
            id: Math.random().toString(32),
        }
    })
}

const generatorDayTime = (arr, item) => {
    if (item.ruleType === 'eraser1440') {
        // 这里是全部清空
        return []
    }
    if(!Array.isArray(arr) || arr.length === 0) {
        return [item]
    }
    // 如果开始时间和结束时间是一样的，那么就是什么也没有做
    if(item.start === item.end) {
        return arr
    }
    let newArr = aplitArray(arr, item)
    return joinArray(newArr)
}

const sharkArrayDate = (arr) => {
    const result = {}
    arr.forEach(item => {
        result[item.day] = generatorDayTime(result[item.day], item)
    });
    return Object.values(result).flat(2)
}



console.log(sharkArrayDate(time))

