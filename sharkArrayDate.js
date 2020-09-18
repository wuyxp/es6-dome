const time = [
    // {
    //     ruleType: "2",
    //     day: "monday",
    //     start: "5:00",
    //     end: "14:00",
    //     id: "0.s44ml7pk75o",
    // },
    // {
    //     ruleType: "2",
    //     day: "tuesday",
    //     start: "10:00",
    //     end: "10:00",
    //     id: "0.pjljskgvtmo",
    // },
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
    // {
    //     ruleType: "eraser30",
    //     day: "tuesday",
    //     start: "6:00",
    //     end: "12:00",
    //     id: "0.bhagu7ka548",
    // },
    // {
    //     ruleType: "0",
    //     day: "wednesday",
    //     start: "0:00",
    //     end: "22:00",
    //     id: "0.9kqipqiigh"
    // },
    // {
    //     ruleType: "2",
    //     day: "thursday",
    //     start: "6:00",
    //     end: "24:00",
    //     id: "0.dqpgh3suj88"
    // },
    // {
    //     ruleType: "1",
    //     day: "tuesday",
    //     start: "9:30",
    //     end: "16:00",
    //     id: "0.ch4nrhjh2n"
    // },
    // {
    //     ruleType: "1",
    //     day: "friday",
    //     start: "3:30",
    //     end: "6:30",
    //     id: "0.9smr9man0b"
    // },
    // {
    //     ruleType: "0",
    //     day: "friday",
    //     start: "4:30",
    //     end: "12:30",
    //     id: "0.ar479rldm3"
    // },
    // {
    //     ruleType: "2",
    //     day: "friday",
    //     start: "9:30",
    //     end: "16:00",
    //     id: "0.lblaupguotg"
    // },
    // {
    //     ruleType: "eraser1440",
    //     day: "friday",
    //     start: "00:00",
    //     end: "24:00",
    //     id: "0.a6leemoggn8"
    // },
    // {
    //     ruleType: "2",
    //     day: "friday",
    //     start: "1:00",
    //     end: "5:00",
    //     id: "0.pbq2kor87v8"
    // },
    // {
    //     ruleType: "1",
    //     day: "friday",
    //     start: "7:00",
    //     end: "10:00",
    //     id: "0.bos732mds98"
    // }
]

// transform 1:00 => 1, 04:30 => 4.5 
const timeToNumber = time => {
    const [s1, s2] = time.split(":")
    return parseInt(s1) + (parseInt(s2) / 60)
}
// transform 1 => 1:00, 4.5 => 04:30
const numberToTime = num => {
    return ('00' + Math.floor(num)).slice(-2) + ':' + num % 1 * 60
}

// 时间减法，第一个时间中删除第二个时间
const computeSubtractionTime = (time1, time2) => {
    // time1 = {start: '1:00', end: '5:00'}
    let result = []
    const { start: time1Start, end: time1End  } = time1
    const { start: time2Start, end: time2End  } = time2
    const s1 = timeToNumber(time1Start)
    const e1 = timeToNumber(time1End)
    const s2 = timeToNumber(time2Start)
    const e2 = timeToNumber(time2End)

    // 当前时间 和 擦掉时间无交集
    if((e1 < s2) || (e2 < s1)) {
        console.log(1)
        result = [time1]
    }
    // 当前时间 在擦到时间的内部
    else if((s1 > s2) && (e1 < e2)) {
        console.log(2)
        result = []
    }
    // 当前时间后半段在和擦掉时间重合
    else if((s1 < s2) && (e1 > s2) && (e2 > e1)) {
        console.log(3)
        result = [{
            start: time1Start,
            end: time2Start
        }]
    }
    // 当前时间前半段 和 擦掉时间重合
    else if((s1 > s2) && (s1 < e1) && (e1 > e2)) {
        console.log(4)
        result = [{
            start: time2End,
            end: time1End
        }]
    }
    // 当前时间中间的一部分是擦掉的时间
    else if((s1 < s2) && (e1 > e2)) {
        console.log(5)
        result = [
            {
                start: time1Start,
                end: time2Start
            }, {
                start: time2End,
                end: time1End
            }
        ]
    }
    return result
}
// 时间加法
const computeAdditionTime = (time1, time2) => {
    let result = []
    const { start: time1Start, end: time1End, ruleType: rt1  } = time1
    const { start: time2Start, end: time2End, ruleType: rt2  } = time2
    const s1 = timeToNumber(time1Start)
    const e1 = timeToNumber(time1End)
    const s2 = timeToNumber(time2Start)
    const e2 = timeToNumber(time2End)
    // 同一类型直接增加时间
    if(rt1 === rt2) {
        // 相加时间互不挨着
        if((e1 < s2) || (e2 < s1)) {
            result = [time1, time2]
        } else {
            // 当前时间和传入时间有交集，那么就直接返回一个最大的
            result = [{
                start: s1 < s2 ? time1Start : time2Start,
                end: e1 > e2 ? time1End : time2End
            }]
        }
    } else {
        // 不同类型先减后加
        result = computeSubtractionTime(time1, time2)
        result.push(time2)
    }
    return result

}

const generatorArray = (arr, item) => {
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
    let newArr = []
    if (item.ruleType === 'eraser30' || item.ruleType === 'eraser60') {
        // 这里是清空一部分
        arr.forEach(currentTime => {
            const cst = computeSubtractionTime(currentTime, item)
            if (cst.length === 1) {
                newArr.push({
                    ...currentTime,
                    ...item[0]
                })
            } else if (cst.length === 2) {
                newArr.push({
                    ...currentTime,
                    ...item[0],
                    id: Math.random().toString(32)
                })
                newArr.push({
                    ...currentTime,
                    ...item[1],
                    id: Math.random().toString(32)
                })
            }
        })
    } else {
        // 我这里要增加了
        arr.forEach(currentTime => {
            const cat = computeAdditionTime(currentTime, item)
            cat.forEach(catItem => {
                newArr.push({
                    ...currentTime,
                    ...catItem,
                    id: Math.random().toString(32)
                })  
            })
            
        })
    }
    return newArr
}

const sharkArrayDate = (arr) => {
    const result = {}
    arr.forEach(item => {
        result[item.day] = generatorArray(result[item.day], item)
    });
    return result
}



console.log(sharkArrayDate(time))

