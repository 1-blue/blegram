const Comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      _id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "댓글의 아이디 ( 댓글을 식별할 값 )",
      },
      content: {
        type: DataTypes.STRING(200),
        alllowNull: true,
        comment: "댓글의 내용 ( 최대 200자, , 특수문자 가능 )",
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Comment",
      tableName: "comments",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    },
  );

  Comment.associate = db => {
    // 유저와 댓글 ( 1 : N )
    db.Comment.belongsTo(db.User, { foreignKey: "UserId", onDelete: "cascade" });

    // 게시글과 댓글 ( 1 : N )
    db.Comment.belongsTo(db.Post, { foreignKey: "PostId", onDelete: "cascade" });

    // 댓글 좋아요 ( N : M ) ( 유저와 댓글 )
    db.Comment.belongsToMany(db.User, {
      through: "CommentLikes",
      as: "CommentLikers",
      foreignKey: "CommentId",
      onDelete: "cascade",
    });

    // 댓글과 답글 ( 1 : N )
    db.Comment.hasMany(db.Comment, { foreignKey: "RecommentId", as: "Recomments", onDelete: "cascade" });
    db.Comment.belongsTo(db.Comment, { foreignKey: "RecommentId", onDelete: "cascade" });
  };

  return Comment;
};

export default Comment;
