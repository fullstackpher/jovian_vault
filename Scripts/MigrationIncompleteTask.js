<%* 
// 这段Templater脚本会读取前一天的日记，提取“未完成”事项
let yesterday = tp.date.now("YYYY-MM-DD", -1);
let yesterdayFile = tp.file.find_tfile("日记/" + yesterday);
if (yesterdayFile) {
    let content = await tp.file.contents(yesterdayFile);
    // 使用正则匹配“未完成”区域的内容
    let match = content.match(/##+.*今日未完成[\s\S]*?(?=##+)/);
    if (match) {
        tR += match[0];
    }
}
%>