export class Video{
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public file: string,
    public thumbnail: string,
    public is_private: boolean,
    public uploaded_at: string,
  ) {}
}
