export default class LpList{
    constructor(config){
        this.head = {val: null, prev: null, next: null};
        this.size = 0;
    }
    addArray(array) {
        for (var i = 0; i < array.length;i++) {
            this.add(array[i]);
        }
    }
    ///Add value at end.
    add(val){
        var test = this.head;
        var end = {val: val, prev: test, next: null};
        var i = 0;
        while (test.next != null){
            test = test.next;
            i += 1;
        }
        end.prev = test;
        test.next = end;
        this.size = i+1;
        return true;
    }
    ///Add value at index.
    addAt(index, val){
        if (index < 0 || index >= this.size){
            return false;
        }
        if (index+1 > this.size) {
            return (this.add(val));
        }
        var i = 0;
        var test = this.head;
        if (i < index) {
            while(i < index){
                test = test.next;
                i += 1;
            }
        }
        var xx = test.next;
        test.next = {val: val, prev: test, next: xx};
        if (test.next.next != null) {
            test.next.next.prev = test.next;
        }
        this.size += 1;
        return true;
    }
    ///Get value at index.
    getAt(index){
        if (index < 0 || index >= this.size){
            return null;
        }
        var helper = {prev: null, val: null, next: this.head.next};
        var i = 0;
        var p = helper;
        while(p.next != null){
            p = p.next;
            if (i == index) {
                return p.val;
            }
            i += 1;
        }
        return null;    
    }
    getByKey(key){
        var result = null;
        this.cycleThrough((ob)=>{
            if (ob.key == key){
                result = ob;
            }
        });
        return result;
    }
    ///Set value at index.
    setAt(index, val){
        if (index < 0 || index >= this.size){
            return false;
        }
        var i = 0;
        var test = this.head.next;
    }
    ///Remove one node containing value. Only useful for simple data types.
    remove(val){
        this.clearEmpty();
        var helper = {prev: null, val: null, next: this.head};
        var p = helper;
        while(p.next != null){
            if (p.next.val == null){
                p=p.next;
            }
            else if (p.next.val == val){
                var pb = p.next.val;
                var next = p.next;
                p.next = next.next;
                if (p.next!=null)
                p.next.prev = p;
                this.size -=1;
                return pb;
            }
            else{
                p = p.next;
            }
        }
        return null;
    }
    ///Remove all nodes containing value. Only useful for simple data types.
    removeAll(val){
        this.clearEmpty();
        var helper = {prev: null, val: null, next: this.head};
        var p = helper;
        while(p.next != null){
            if (p.next.val == null){
                p=p.next;
            }
            else if (p.next.val == val){
                var next = p.next;
                p.next = next.next;
                if (p.next!=null)
                p.next.prev = p;
                this.size -=1;
            }
            else{
                p = p.next;
            }
        }
    }
    //Remove all values that contain a specified key. Returns the number of removed objects.
    //outdated?//
    removeByKey(key){
        this.clearEmpty();
        var helper = {prev: null, val: null, next: this.head};
        var p = helper;
        while(p.next != null){
            if (p.next.val == null){
                p = p.next;
            }
            else if (p.next.val.key == key){
                var next = p.next;
                p.next = next.next;
                if (p.next!=null)
                p.next.prev = p;
                this.size -=1;
                return true;
            }
            else{
                p = p.next;
            }
        }
        return false;
    }
    removeByQuery(call,allowNull = false){
        var result = false;
        var helper = {prev: null, val: null, next: this.head.next};
        var p = helper;
        while(p.next != null){
            p = p.next;
            if (p.val != null || allowNull) {
                if (call(p.val)) {
                if (p.prev) {
                    p.prev.next = p.next;
                    if (p.next) {
                    p.next.prev = p.prev;
                    }
                }
                this.size -=1;
                result = true;
                }
            }
        }
        return result;
    }
    removeAllByKey(key){
        var removed = 0;
        this.clearEmpty();
        var helper = {prev: null, val: null, next: this.head};
        var p = helper;
        while(p.next != null){
            if (p.next.val == null){
                p = p.next;
            }
            else if (p.next.val.key == key){
                var next = p.next;
                p.next = next.next;
                if (p.next!=null)
                p.next.prev = p;
                this.size -=1;
                removed+=1;
            }
            else{
                p = p.next;
            }
        }
        return removed;
    }
    ///Remove node at index.
    removeAt(index){
        if (index < 0 || index >= this.size){
        return null;
        }
        this.clearEmpty();
        var i = 0;
        var helper = {prev: null, val: null, next: this.head};
        var p = helper;
        while(p.next != null){
            if (p.next.val == null){
                p = p.next;
            }
            else if (i==index){
                var pv = p.next.val;
                var next = p.next;
                p.next = next.next;
                if (p.next!=null)
                {p.next.prev = p;}
                this.size -=1;
                return pv;
            }
            else{
                p = p.next;
                i+=1;
            }
        }
        return null;
    }
    ///Get total number of nodes.
    length(){
        return this.size;
    }
    ///Remove nodes with null values.
    clearEmpty(){
        var test = this.head;
        while (test.next != null){
            test = test.next;
            if (test.val == null){
                test.prev.next = test.next;
                if (test.next != null)
                {test.next.prev = test.prev;}
                this.size -=1;
                test = this.head;
            }
        }
    }
    contains(val) {
        var result = false;
        this.cycleThrough((ob)=>{
            if (ob == val) {
                result = true;
            }
        });
        return result;
    }
    containsByKey(key) {
        var result = false;
        this.cycleThrough((ob)=>{
            if (ob.key == key) {
                result = true;
            }
        });
        return result;
    }
    numberOfKey(key) {
        var result = 0;
        this.cycleThrough((ob)=>{
            if (ob.key == key) {
                result += 1;
            }
        });
        return result;
    }
    clear(){
        this.head.next = null;
        this.size = 0;
    }
    ///Cycle through the entire linked list, perform an operation using each value as the argument.
    getByQuery(call,allowNull = false){
        var result = new LpList({});
        var helper = {prev: null, val: null, next: this.head.next};
        var p = helper;
        while(p.next != null){
            p = p.next;
            if (p.val != null || allowNull) {
                if (call(p.val)) {
                    result.add(p.val);
                }
            }
        }
        return result;
    }
    ///Cycle through the entire linked list, perform an operation using each value as the argument.
    getFirstByQuery(call,allowNull = false){
        var helper = {prev: null, val: null, next: this.head.next};
        var p = helper;
        while(p.next != null){
            p = p.next;
            if (p.val != null || allowNull) {
                if (call(p.val)) {
                    return p.val;
                }
            }
        }
        return null;
    }
    ///Cycle through the entire linked list, perform an operation using each value as the argument.
    cycleThrough(call,allowNull = false){
        var helper = {prev: null, val: null, next: this.head.next};
        var p = helper;
        while(p.next != null){
            p = p.next;
            if (p.val != null || allowNull) {
                call(p.val);
            }
        }
    }
    cycleThroughReverse(call,allowNull = false){
        var helper = {prev: null, val: null, next: this.head.next};
        var p = helper;
        while(p.next != null){
            p = p.next;
        }
        while(p.prev != null){
            p = p.prev;
            if (p.val != null || allowNull) {
                call(p.val);
            }
        }
    }
    sort(method) {
        var helper = null;
        var p = null;
        //REPEAT UNTIL NO CHANGES ARE MADE//
        var changed = true;
        while (changed){
            helper = {prev: null, val: null, next: this.head.next};
            p = helper;
            changed = false;
            while(p.next != null){
                p = p.next;
                if (p.val != null) {
                    if (p.prev != null) {
                        if (p.prev.val != null) {
                            //RETURN TRUE IF THIS ENTRY SHOULD MOVE IN FRONT OF THE PRIOR//
                            if (method(p.prev.val,p.val)) {
                                changed = true;
                                var ppp = p.prev.val;
                                p.prev.val = p.val;
                                p.val = ppp;
                            }
                        }
                    }
                }
            }
        }
        return this;
    }
    shuffle() {
        for (var i = this.length()-1;i >=0;i--){
        var ind = Math.floor(Math.random()*(this.length()-i));
            this.add(this.removeAt(ind));
        }
        this.clearEmpty();
    }
    copyFrom(list) {
        list.cycleThrough((ob)=>{
            this.add(ob);
        });
    }
    clone() {
        var result = new LpList({});
        this.cycleThrough((ob)=>{
            result.add(ob);
        });
        return result;
    }
    lpListString(){
        var result = "LPLIST: LENGTH = "+this.length()+"[\n";
        this.cycleThrough((ob)=>{
        if (ob == null){result += "NULL,\n";}
        else{
            result += ob.key+",\n";
        }
        });
        result += "]";
        return result;
    }
    toArray() {
        if (this.length() < 1) {return [];}
        var result = [this.length()];
        var i = 0;
        this.cycleThrough((ob)=>{
        result[i] = ob;
        i += 1;
        });
        return result;
    }
}