const {round, floor, random, min, max, abs} = Math;

Array.prototype.remove = function(a) {
  var idx = this.indexOf(a)
  for (var i = idx; i < this.length - 1; i++) {
    this[i] = this[i+1]
  }

  this.length -= 1
}

String.prototype.strip = function(c) {
  var i = 0,
    j = this.length - 1;
  while (this[i] === c) i++;
  while (this[j] === c) j--;
  return this.slice(i, j + 1);
}

String.prototype.count = function(c) {
  var result = 0,
    i = 0;
  for (i; i < this.length; i++)
    if (this[i] == c) result++;
  return result;
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Number.prototype.quantf = function() {
  if(this < 1000){
    return this
  }else if(this < 1e6){
    return Math.floor(this/1000)+"K"
  }else{
    return Math.floor(this/1e5)/10 +"M"
  }
};

Date.prototype.time12 = function() {
  return this.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric"
  })
};

Date.prototype.time24 = function() {
  return this.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false
  })
};

Date.prototype.pastdate = function() {
  if(this.toDateString() == new Date().toDateString()) return "Today"
  else if (this.toDateString() == new Date(new Date() - 24*3600000).toDateString()) {
    return "Yesterday"
  }else{
    return this.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }
};

Date.prototype.minifyTime = function(t) {
  if(!t) t = round((new Date() - this)/(60*1000))

  if(t < 60) return `${t} min ago`
  else{
    var d = new Date(new Date() - t*60*1000),
        timestr = d.pastdate() + ', '

    timestr += d.time12()
    return timestr
  }
}

Date.prototype.pastdatetime = function() {
  var timestr = "", cdate = new Date();
  if(this.toDateString() == cdate.toDateString()) timestr = "Today"
  else if (this.toDateString() == new Date(cdate - 24*36*1e5).toDateString()) {
    timestr = "Yesterday"
  }else if(this.getFullYear() == cdate.getFullYear()){
    timestr = this.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric"
    })
  }else{
    timestr = this.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "2-digit"
    })
  }

  timestr += ", "
  timestr += this.time12()

  return timestr
};