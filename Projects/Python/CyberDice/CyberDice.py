import secrets
import numpy as np

class CyberDice: 
    def __init__(self, start, stop, width=1, repeats=1) -> None:
        self.start = start
        self.stop = stop
        self.width = width 
        self.repeats = repeats 
        self.results = [int]*self.repeats
        self.counts = [0]*self.stop 

    def throw(self) -> int: 
        return(secrets.SystemRandom().randrange(self.start, self.stop, self.width))
    
    def bulk_throw(self):
        i = 0 
        for i in range(0, self.repeats): 
            self.results[i] = self.throw()
        return self.results 
    
    def print_sum(self): 
        sum_str = "Sum of past {throws} is {result}".format(throws=self.repeats, result=sum(self.results))
        print(sum_str)

    def print_summary(self): 
        print("---------\nDice Results: \n")
        out_stat = "{r} dice(s) thrown, \nmax: {h}, min: {l}\nmean: {a}, median: {m}\n".format(r=len(self.results), h=np.max(self.results), l=np.min(self.results), a=np.average(self.results), m=np.median(self.results))
        print(out_stat)
        print("Number : Appearances")

        self.count_numbers()

        for _ in range(self.start, self.stop): 
            count_str = "{value} : {times}".format(value=_,times=self.counts[_])
            print(count_str)

    def count_numbers(self):
        for j in range(0, len(self.results)): 
            result = self.results[j] 
            for i in range(self.start, self.stop): 
                if result == i: 
                    self.counts[i] = self.counts[i] + 1

        return self.counts

        
if __name__ == "__main__":
    dice = CyberDice(1, 7, width=1, repeats=500000)
    dice.bulk_throw()
    dice.print_summary()
