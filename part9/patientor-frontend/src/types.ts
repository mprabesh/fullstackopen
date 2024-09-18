export type CoursePart = CoursePartBasic | coursePartGroup | coursePartBackground;
interface CoursePartBase{
  name:string;
  excerciseCount:number;
}
interface CoursePartBasic extends CoursePartBase{
    description:string;
    kind:"basic";
  }

interface coursePartGroup extends CoursePartBase{
  groupProjectCount:number;
  kind:"group";
}

interface coursePartBackground extends CoursePartBase{
  description:string;
  backgroundMaterial:string;
  kind:"background";
}
  
export interface CourseProps{
      courseParts:CoursePart[]
  }
  

export interface totalValType{
    totalVal:number
}


export interface PropHeader{
    courseName:string
}

