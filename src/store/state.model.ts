import { CourseItem } from './courseItem.model';

export interface State {
  readonly courses: Array<CourseItem>;
}